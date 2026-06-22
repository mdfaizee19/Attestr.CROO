import dotenv from 'dotenv'; dotenv.config({ override: true });

function extractJson(text: string): string {
  const stripped = text.replace(/^```(?:json)?\s*/m, '').replace(/```\s*$/m, '').trim();
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  const json = start !== -1 && end > start ? stripped.slice(start, end + 1) : stripped;
  return json.replace(/"(?:[^"\\]|\\.)*"/g, (m: string) =>
    m.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t'),
  );
}

async function groq(system: string, user: string): Promise<string> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
  });
  if (!res.ok) throw new Error(`Groq error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { choices: { message: { content: string } }[] };
  return data.choices[0]?.message?.content ?? '';
}

interface HLVaultFollower { user: string; vaultEquity: string }
interface HLVaultPortfolioEntry { accountValueHistory: [number, string][] }
interface HLVault {
  name: string; leader: string; apr: number;
  leaderCommission: number; isClosed: boolean; allowDeposits: boolean;
  followers: HLVaultFollower[];
  maxDistributable: number;
  portfolio: [string, HLVaultPortfolioEntry][];
}

async function main() {
  const vaultAddress = '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303';
  console.log('=== ATTESTR — analyze_hyperliquid_vault FULL TEST (fixed) ===');
  console.log('Vault:', vaultAddress, '(HLP)\n');

  console.log('[1/3] Fetching from Hyperliquid API...');
  const res = await fetch('https://api.hyperliquid.xyz/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'vaultDetails', vaultAddress }),
  });
  if (!res.ok) throw new Error(`Hyperliquid API error: ${res.status}`);
  const vault = (await res.json()) as HLVault;

  // TVL: highest accountValueHistory entry across portfolio periods
  let tvl = 0;
  for (const [, entry] of vault.portfolio ?? []) {
    const hist = entry?.accountValueHistory ?? [];
    if (hist.length > 0) {
      const latest = parseFloat(hist[hist.length - 1][1]);
      if (latest > tvl) tvl = latest;
    }
  }

  const apr = vault.apr ?? 0;
  const commission = vault.leaderCommission ?? 0;
  const followers = Array.isArray(vault.followers) ? vault.followers.length : 0;

  console.log('    Name          :', vault.name);
  console.log('    TVL           : $' + tvl.toLocaleString(undefined, { maximumFractionDigits: 0 }));
  console.log('    APR           :', (apr * 100).toFixed(4) + '%');
  console.log('    Commission    :', (commission * 100).toFixed(2) + '%');
  console.log('    Followers     :', followers, '(returned in page)');
  console.log('    Allow Deposits:', vault.allowDeposits);
  console.log('    Closed        :', vault.isClosed ? 'Yes' : 'No');

  console.log('\n[2/3] Calling Groq for risk analysis...');
  const prompt = `Hyperliquid Vault:
Name: ${vault.name}
Address: ${vaultAddress}
TVL: $${tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
APR: ${(apr * 100).toFixed(4)}%
Commission: ${(commission * 100).toFixed(2)}%
Followers: ${followers}
Allow Deposits: ${vault.allowDeposits ? 'Yes' : 'No'}
Closed: ${vault.isClosed ? 'Yes' : 'No'}

RISK SIGNALS: APR >200% = high leverage risk. TVL <$10K = manipulation risk. Commission >20% = drags net returns. Closed = no new deposits.

Return JSON: {"badge":"SAFE","riskScore":0,"riskFactors":["..."],"depositRecommendation":"YES","recommendationReason":"...","report":"..."}
0-30=SAFE, 31-65=CAUTION, 66-100=DANGEROUS. No markdown fences.`;

  const text = await groq('You are a DeFi analyst specializing in Hyperliquid vault strategies.', prompt);
  const parsed = JSON.parse(extractJson(text)) as {
    badge: string; riskScore: number; riskFactors: string[];
    depositRecommendation: string; recommendationReason: string; report: string;
  };

  console.log('\n[3/3] RESULT:');
  console.log('─'.repeat(60));
  console.log('Badge               :', parsed.badge);
  console.log('Risk Score          :', Math.max(0, Math.min(100, parsed.riskScore)) + '/100');
  console.log('TVL                 : $' + tvl.toLocaleString(undefined, { maximumFractionDigits: 0 }));
  console.log('APR                 :', (apr * 100).toFixed(4) + '%');
  console.log('Commission          :', (commission * 100).toFixed(2) + '%');
  console.log('Followers           :', followers);
  console.log('Allow Deposits      :', vault.allowDeposits);
  console.log('Deposit Recommended :', parsed.depositRecommendation);
  console.log('Reason              :', parsed.recommendationReason);
  console.log('\nRisk Factors:');
  parsed.riskFactors.forEach((f, i) => console.log('  ' + (i + 1) + '. ' + f));
  console.log('\nFull Report:\n' + parsed.report);
  console.log('\n=== TEST COMPLETE ✅ ===');
}

main().catch((e) => { console.error('\n❌ FAILED:', (e as Error).message); process.exit(1); });
