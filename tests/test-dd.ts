/**
 * test-dd.ts — mock due diligence pipeline test (no CROO network)
 * Simulates a DUE_DILIGENCE service order: research + risk run in parallel, merged.
 * Run: npx ts-node --transpile-only test-dd.ts [query] [address] [chainId]
 */
import dotenv from 'dotenv'; dotenv.config({ override: true });
import type { DueDiligenceResult, ResearchTask, RiskAnalysisTask, SynthesisInput } from './src/types';

const QUERY   = process.argv[2] ?? 'What are the risks of using USDC on Base?';
const ADDRESS = process.argv[3] ?? '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const CHAIN_ID = Number(process.argv[4] ?? '8453');

const GROQ_URL  = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

const hr = (label = '') =>
  console.log(`\n${'─'.repeat(64)}${label ? `\n${label}` : ''}`);

// ── Shared helpers ────────────────────────────────────────────────────────────

function extractJson(text: string): string {
  const stripped = text.replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  const json = start !== -1 && end > start ? stripped.slice(start, end + 1) : stripped;
  return json.replace(/"(?:[^"\\]|\\.)*"/g, (m) =>
    m.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t'),
  );
}

async function groq(system: string, user: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ model: GROQ_MODEL, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
  });
  if (!res.ok) throw new Error(`Groq error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content ?? '';
}

// ── Research pipeline ─────────────────────────────────────────────────────────

async function runResearch(task: ResearchTask) {
  console.log(`\n[research] query: "${task.query}"`);
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error('SERPER_API_KEY not set');
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-KEY': apiKey },
    body: JSON.stringify({ q: task.query, num: task.maxSources ?? 6 }),
  });
  if (!res.ok) throw new Error(`Serper error: ${res.status}`);
  const data = (await res.json()) as { organic?: { title: string; link: string; snippet: string; source?: string }[] };
  const findings = (data.organic ?? []).slice(0, task.maxSources ?? 6).map((f) => ({
    title: f.title, url: f.link, snippet: f.snippet,
    source: f.source ?? new URL(f.link).hostname,
  }));
  console.log(`[research] ${findings.length} findings`);

  // Verify sources
  const verified = await Promise.all(findings.map(async (f) => {
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 6000);
      const r = await fetch(f.url, { method: 'HEAD', signal: c.signal, redirect: 'follow' });
      clearTimeout(t);
      return { url: f.url, isAccessible: r.status < 400, statusCode: r.status };
    } catch { return { url: f.url, isAccessible: false }; }
  }));
  const okCount = verified.filter((v) => v.isAccessible).length;
  console.log(`[research] verified ${okCount}/${findings.length} sources`);

  const verifiedUrls = new Set(verified.filter((v) => v.isAccessible).map((v) => v.url));
  const vf = findings.filter((f) => verifiedUrls.has(f.url));
  const uf = findings.filter((f) => !verifiedUrls.has(f.url));
  const ordered = [...vf, ...uf];
  const findingsText = ordered.map((f, i) => {
    const s = verifiedUrls.has(f.url) ? '✓ verified' : '⚠ unverified';
    return `[${i + 1}] ${f.title} (${s})\nSource: ${f.url}\n${f.snippet}`;
  }).join('\n\n');

  const prompt = `Query: "${task.query}"\n\nResearch findings (${vf.length} verified, ${uf.length} unverified):\n\n${findingsText || 'No findings.'}\n\nReturn JSON:\n{"executiveSummary":"...","keyFindings":["..."],"riskAssessment":"...","recommendations":["..."],"confidenceScore":0,"report":"..."}\nNo markdown fences.`;
  console.log(`[research] calling Groq…`);
  const text = await groq('You are a Web3 Intelligence analyst specializing in DeFi research.', prompt);
  const p = JSON.parse(extractJson(text)) as { executiveSummary: string; keyFindings: string[]; riskAssessment: string; recommendations: string[]; confidenceScore: number; report: string };
  const confidence = Math.max(0, Math.min(100, p.confidenceScore));
  console.log(`[research] synthesis done: confidence=${confidence}/100`);
  return {
    query: task.query, executiveSummary: p.executiveSummary, keyFindings: p.keyFindings,
    riskAssessment: p.riskAssessment, recommendations: p.recommendations,
    confidenceScore: confidence, verifiedSources: [...verifiedUrls],
    unverifiedSources: uf.map((f) => f.url), report: p.report,
    synthesizedAt: new Date().toISOString(),
  };
}

// ── Risk pipeline ─────────────────────────────────────────────────────────────

async function runRisk(task: RiskAnalysisTask) {
  const chainId = task.chainId ?? 1;
  console.log(`\n[risk] address: ${task.address} (chainId: ${chainId})`);
  const apiKey = process.env.ETHERSCAN_API_KEY;
  if (!apiKey) throw new Error('ETHERSCAN_API_KEY not set');

  const chainName = chainId === 8453 ? 'Base' : chainId === 137 ? 'Polygon' : 'Ethereum';
  const fetchE = async <T>(params: Record<string, string>): Promise<T | null> => {
    const url = new URL('https://api.etherscan.io/v2/api');
    url.searchParams.set('chainid', String(chainId));
    url.searchParams.set('apikey', apiKey);
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
    try {
      const c = new AbortController(); const t = setTimeout(() => c.abort(), 10000);
      const r = await fetch(url.toString(), { signal: c.signal }); clearTimeout(t);
      const d = (await r.json()) as { status: string; result: T };
      return d.status === '1' ? d.result : null;
    } catch { return null; }
  };

  const [srcCode] = await Promise.allSettled([
    fetchE<{ ContractName: string; CompilerVersion: string; SourceCode: string; Proxy: string; Implementation: string }[]>(
      { module: 'contract', action: 'getsourcecode', address: task.address }
    ),
  ]);
  const src = srcCode.status === 'fulfilled' ? srcCode.value?.[0] : null;
  const lines = [`Address: ${task.address}`, `Chain: ${chainName} (chainId: ${chainId})`, ''];
  if (src?.ContractName) {
    lines.push(`Type: Contract — ${src.ContractName}`, `Compiler: ${src.CompilerVersion}`, `Source verified: ${src.SourceCode ? 'Yes' : 'No'}`);
    if (src.Proxy === '1') lines.push(`Proxy: Yes (implementation: ${src.Implementation})`);
  } else {
    lines.push('Type: EOA or unverified');
  }
  const context = lines.join('\n');
  console.log(`[risk] on-chain data:\n${context}`);

  const prompt = `On-chain data:\n${context}\n\nPOSITIVE signals: verified source, proxy on verified contract, known naming (FiatToken/USDC/WETH etc.) = low risk.\nRED FLAGS: unverified source, very new contract, suspicious naming, scam patterns.\nProxy alone is neutral.\n\nReturn JSON: {"badge":"SAFE"|"CAUTION"|"DANGEROUS","riskScore":0,"reasons":["..."],"report":"..."}\n0-30=SAFE,31-65=CAUTION,66-100=DANGEROUS. No markdown fences.`;
  console.log(`[risk] calling Groq…`);
  const text = await groq('You are a blockchain security expert. Produce calibrated, accurate risk scores — not conservative over-scoring.', prompt);
  const p = JSON.parse(extractJson(text)) as { badge: 'SAFE' | 'CAUTION' | 'DANGEROUS'; riskScore: number; reasons: string[]; report: string };
  console.log(`[risk] analysis done: ${p.badge} (${p.riskScore}/100)`);
  return { address: task.address, badge: p.badge, riskScore: Math.max(0, Math.min(100, p.riskScore)), reasons: p.reasons, report: p.report, analyzedAt: new Date().toISOString() };
}

// ── Due Diligence merge ───────────────────────────────────────────────────────

async function runDueDiligence(query: string, address: string, chainId: number): Promise<DueDiligenceResult> {
  console.log('\n[dd] running research and risk pipelines in parallel…');
  const [research, risk] = await Promise.all([
    runResearch({ query }),
    runRisk({ address, chainId }),
  ]);

  const overallConfidence = Math.round((research.confidenceScore + (100 - risk.riskScore)) / 2);

  const combinedReport = [
    `# Due Diligence Report`,
    ``,
    `**Query:** ${query}`,
    `**Contract:** \`${address}\``,
    `**Overall Confidence:** ${overallConfidence}/100`,
    ``,
    `---`,
    ``,
    `## Research Findings`,
    ``,
    research.report,
    ``,
    `---`,
    ``,
    `## Risk Analysis`,
    ``,
    `**Address:** \`${risk.address}\`  `,
    `**Badge:** ${risk.badge} | **Score:** ${risk.riskScore}/100`,
    ``,
    `**Risk Factors:**`,
    ...risk.reasons.map((r) => `- ${r}`),
    ``,
    risk.report,
    ``,
    `---`,
    ``,
    `## Combined Assessment`,
    ``,
    `**Research confidence:** ${research.confidenceScore}/100 (${research.verifiedSources.length} verified sources)`,
    `**Risk score:** ${risk.riskScore}/100 — ${risk.badge}`,
    `**Overall confidence:** ${overallConfidence}/100`,
    ``,
    `### Key Research Findings`,
    ...research.keyFindings.map((f) => `- ${f}`),
    ``,
    `### Risk Factors`,
    ...risk.reasons.map((r) => `- ${r}`),
    ``,
    `### Recommendations`,
    ...research.recommendations.map((r) => `- ${r}`),
  ].join('\n');

  return {
    type: 'due_diligence',
    query,
    address,
    research,
    risk,
    combinedReport,
    analyzedAt: new Date().toISOString(),
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║   ATTESTR DUE DILIGENCE PIPELINE TEST (no CROO network)        ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log(`\nQuery   : "${QUERY}"`);
  console.log(`Address : ${ADDRESS}  (chainId: ${CHAIN_ID})`);
  console.log(`\n[mock] simulating DUE_DILIGENCE service order`);
  console.log(`[mock] service ID would be: ${process.env.CROO_SERVICE_ID_DUE_DILIGENCE ?? 'ef8fa2e1-4c5d-40f8-973d-4a1623b54eea'}`);

  const result = await runDueDiligence(QUERY, ADDRESS, CHAIN_ID);

  hr('RESEARCH SUMMARY');
  console.log(`Confidence   : ${result.research.confidenceScore}/100`);
  console.log(`Verified src : ${result.research.verifiedSources.length}/${result.research.verifiedSources.length + result.research.unverifiedSources.length}`);
  console.log(`\nExecutive Summary:`);
  console.log(result.research.executiveSummary);
  console.log(`\nKey Findings (${result.research.keyFindings.length}):`);
  result.research.keyFindings.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));

  hr('RISK SUMMARY');
  console.log(`Badge      : ${result.risk!.badge}`);
  console.log(`Risk Score : ${result.risk!.riskScore}/100`);
  console.log(`\nRisk Factors:`);
  result.risk!.reasons.forEach((r, i) => console.log(`  ${i + 1}. ${r}`));

  hr('COMBINED REPORT (markdown)');
  console.log(result.combinedReport);

  hr('RESULT STRUCTURE (JSON keys)');
  console.log(JSON.stringify({
    type: result.type,
    query: result.query,
    address: result.address,
    'research.confidenceScore': result.research.confidenceScore,
    'research.keyFindings.length': result.research.keyFindings.length,
    'risk.badge': result.risk?.badge,
    'risk.riskScore': result.risk?.riskScore,
    analyzedAt: result.analyzedAt,
  }, null, 2));

  hr('DUE DILIGENCE TEST COMPLETE ✅');
}

main().catch((err) => {
  console.error('\n❌ Due diligence test failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
