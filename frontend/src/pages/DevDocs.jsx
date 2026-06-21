import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { C } from '../tokens'

const NAV = [
  { id: 'quickstart',   label: '⚡ Quick Start' },
  { id: 'mcp-claude',   label: '🤖 Claude Desktop' },
  { id: 'mcp-code',     label: '💻 Claude Code' },
  { id: 'mcp-cursor',   label: '⚡ Cursor' },
  { id: 'cap',          label: '🔗 CAP Protocol' },
  { id: 'a2a',          label: '🤝 A2A Standard' },
  { id: 'tools',        label: '📦 Tool Reference' },
  { id: 'architecture', label: '🏗️ Architecture' },
  { id: 'env',          label: '🔑 Environment' },
]

function Code({ children, lang = '' }) {
  return (
    <div style={{ background: '#0a1f3d', borderRadius: 14, overflow: 'hidden',
      border: `1px solid rgba(255,255,255,.06)`, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,.06)', background: 'rgba(255,255,255,.02)' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }}/>
        ))}
        {lang && <span style={{ marginLeft: 'auto', fontSize: '.68rem', color: 'rgba(255,255,255,.25)' }}>{lang}</span>}
      </div>
      <pre style={{ padding: '18px 20px', color: '#86efac', fontSize: '.78rem', lineHeight: 1.85,
        overflowX: 'auto', margin: 0, whiteSpace: 'pre' }}>{children}</pre>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <div id={id} style={{ paddingTop: 60, marginBottom: 64 }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: C.navy,
        letterSpacing: '-.03em', marginBottom: 6 }}>{title}</h2>
      <div style={{ width: 40, height: 3, background: '#7c3aed', borderRadius: 2, marginBottom: 28 }}/>
      {children}
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const s = {
    info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: 'ℹ️' },
    tip:     { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: '💡' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: '⚠️' },
  }[type]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12,
      padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 12 }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
      <div style={{ fontSize: '.85rem', color: s.color, lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}

function PropRow({ name, type, required, desc }) {
  return (
    <tr style={{ borderBottom: `1px solid ${C.borderL}` }}>
      <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '.78rem',
        fontWeight: 700, color: '#7c3aed' }}>{name}</td>
      <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: '.75rem', color: '#f59e0b' }}>{type}</td>
      <td style={{ padding: '12px 14px' }}>
        <span style={{ padding: '2px 7px', borderRadius: 4, fontSize: '.68rem', fontWeight: 700,
          background: required ? '#fee2e2' : C.bgSoft, color: required ? '#ef4444' : C.muted }}>
          {required ? 'required' : 'optional'}
        </span>
      </td>
      <td style={{ padding: '12px 14px', fontSize: '.82rem', color: C.muted }}>{desc}</td>
    </tr>
  )
}

function ToolCard({ name, color, price, desc, params, returns }) {
  return (
    <div style={{ background: '#fff', border: `1.5px solid ${color}33`, borderRadius: 18,
      overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ background: color + '0a', borderBottom: `1px solid ${color}22`, padding: '18px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'SF Mono, Fira Code, monospace', fontSize: '.9rem',
            fontWeight: 800, color }}>{name}</div>
          <div style={{ fontSize: '.8rem', color: C.muted, marginTop: 4 }}>{desc}</div>
        </div>
        <span style={{ padding: '5px 12px', borderRadius: 999, fontSize: '.78rem', fontWeight: 800,
          background: C.greenL, color: C.green, border: `1px solid ${C.green}33`, whiteSpace:'nowrap' }}>
          {price} USDC
        </span>
      </div>
      <div style={{ padding: '16px 22px' }}>
        <div style={{ fontSize: '.72rem', fontWeight: 700, color: C.faint,
          textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Parameters</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem',
          background: C.bgSoft, borderRadius: 10, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: C.bgBlue }}>
              {['Name','Type','Required','Description'].map(h => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left',
                  fontSize: '.68rem', fontWeight: 700, color: C.ocean,
                  textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params.map(p => <PropRow key={p.name} {...p}/>)}
          </tbody>
        </table>
        <div style={{ marginTop: 14, padding: '12px 14px', background: C.bgSoft,
          borderRadius: 10, border: `1px solid ${C.borderL}` }}>
          <div style={{ fontSize: '.7rem', fontWeight: 700, color: C.faint,
            textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Returns</div>
          <div style={{ fontSize: '.82rem', color: C.muted }}>{returns}</div>
        </div>
      </div>
    </div>
  )
}

export default function DevDocs() {
  const [active, setActive] = useState('quickstart')

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 68, minHeight: '100vh', background: '#fff' }}>

        {/* Page header */}
        <div style={{ background: 'linear-gradient(135deg, #f5f0ff, #ede9fe)',
          borderBottom: `1px solid #e9d8ff`, padding: '48px 24px 40px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Link to="/" style={{ fontSize: '.82rem', color: C.muted, textDecoration: 'none' }}>Home</Link>
              <span style={{ color: C.faint }}>›</span>
              <span style={{ fontSize: '.82rem', color: '#7c3aed', fontWeight: 600 }}>Developer Docs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <h1 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900,
                  letterSpacing: '-.03em', color: C.navy, marginBottom: 10 }}>
                  ⚙️ Developer Documentation
                </h1>
                <p style={{ color: C.muted, fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
                  MCP server setup, CAP lifecycle, A2A compatibility, tool schemas, and architecture reference for integrating with Attestr.
                </p>
              </div>
              <Link to="/docs/traders" style={{ display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', background: '#fff', border: `1px solid #e9d8ff`,
                borderRadius: 12, textDecoration: 'none', color: C.muted, fontSize: '.85rem',
                fontWeight: 600, transition: 'all .2s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#a78bfa'; e.currentTarget.style.color = '#7c3aed' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e9d8ff'; e.currentTarget.style.color = C.muted }}>
                Switch to Trader Docs →
              </Link>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>

          {/* Sidebar */}
          <aside style={{ position: 'sticky', top: 88, paddingTop: 40 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {NAV.map(n => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setActive(n.id)}
                  style={{ padding: '9px 14px', borderRadius: 10, fontSize: '.85rem',
                    fontWeight: active === n.id ? 700 : 500,
                    color: active === n.id ? '#7c3aed' : C.muted,
                    background: active === n.id ? '#f5f0ff' : 'transparent',
                    textDecoration: 'none', transition: 'all .15s', display: 'block' }}
                  onMouseEnter={e => { if (active !== n.id) e.currentTarget.style.background = C.bgSoft }}
                  onMouseLeave={e => { if (active !== n.id) e.currentTarget.style.background = 'transparent' }}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div style={{ marginTop: 32, padding: '16px', background: '#0a0a0a', borderRadius: 14 }}>
              <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: 8,
                textTransform: 'uppercase', letterSpacing: '.08em' }}>Resources</div>
              <a href="https://croo.network" target="_blank" rel="noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '8px 12px', marginBottom: 8,
                  background: '#5DC82A', color: '#000', fontWeight: 700, fontSize: '.8rem',
                  borderRadius: 8, textDecoration: 'none' }}>
                CROO Dashboard →
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '8px 12px',
                  background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.5)',
                  fontWeight: 600, fontSize: '.8rem', borderRadius: 8, textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,.08)' }}>
                GitHub Repo →
              </a>
            </div>
          </aside>

          {/* Content */}
          <main style={{ paddingTop: 16, minWidth: 0 }}>

            <Section id="quickstart" title="⚡ Quick Start">
              <Code lang="bash">{`# 1. Clone the repo
git clone https://github.com/your-org/attestr
cd attestr

# 2. Install dependencies
npm install

# 3. Copy env file and fill in your keys
cp .env.example .env

# 4. Start all agents (each in a separate terminal)
npm run start:coordinator
npm run start:web-research
npm run start:source-verification
npm run start:synthesis

# 5. Add the MCP server to your Claude config (see MCP section below)`}</Code>
              <Callout type="tip">
                You need one CROO SDK key per agent, plus an Anthropic API key for the Synthesis agent. Get CROO keys from the CROO Dashboard after registering your services.
              </Callout>
            </Section>

            <Section id="mcp-claude" title="🤖 MCP Setup — Claude Desktop">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Claude Desktop reads MCP servers from a JSON config file. Add Attestr once and all four tools appear in your chat input.
              </p>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 10 }}>1. Locate your config file</h3>
              <Code lang="Location">{`# macOS
~/.claude/claude_desktop_config.json

# Windows
%APPDATA%\\Claude\\claude_desktop_config.json`}</Code>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 10 }}>2. Add Attestr MCP server</h3>
              <Code lang="claude_desktop_config.json">{`{
  "mcpServers": {
    "attestr": {
      "command": "node",
      "args": ["/absolute/path/to/attestr/src/mcp/index.js"],
      "env": {
        "CROO_SDK_KEY": "sk-your-key-here"
      }
    }
  }
}`}</Code>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 10 }}>3. Verify connection</h3>
              <p style={{ color: C.muted, fontSize: '.85rem', lineHeight: 1.65, marginBottom: 12 }}>
                Restart Claude Desktop. Look for the 🔌 icon in the chat input bar. Click it to see available Attestr tools.
              </p>
              <Callout type="info">
                You should see: <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 6px',borderRadius:4 }}>check_contract_risk</code>, <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 6px',borderRadius:4 }}>analyze_hyperliquid_vault</code>, <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 6px',borderRadius:4 }}>research_web3</code>, <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 6px',borderRadius:4 }}>full_due_diligence</code>
              </Callout>
            </Section>

            <Section id="mcp-code" title="💻 MCP Setup — Claude Code">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Claude Code CLI supports MCP servers via the <code style={{ fontFamily:'monospace',background:C.bgSoft,padding:'1px 6px',borderRadius:4 }}>claude mcp add</code> command. Tools become available in every session.
              </p>
              <Code lang="Terminal">{`# Add Attestr as an MCP server
claude mcp add attestr \\
  --command node \\
  --args "/path/to/attestr/src/mcp/index.js" \\
  --env CROO_SDK_KEY=sk-your-key-here

# List all MCP servers (verify it was added)
claude mcp list

# Use in a session
claude
> Use check_contract_risk on 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`}</Code>
              <Callout type="tip">
                In VS Code or JetBrains with the Claude Code extension, the same MCP servers are available in the sidebar chat — no extra setup needed once you've run <code style={{ fontFamily:'monospace',background:'#f0fdf4',padding:'1px 6px',borderRadius:4 }}>claude mcp add</code>.
              </Callout>
            </Section>

            <Section id="mcp-cursor" title="⚡ MCP Setup — Cursor">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Cursor supports MCP servers via its settings UI or directly via a config file.
              </p>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 10 }}>Option A — Settings UI</h3>
              <div style={{ background: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: 14, padding: '16px 20px', marginBottom: 20 }}>
                {['Open Cursor Settings (⌘ + ,)', 'Navigate to Features → MCP Servers', 'Click "Add new MCP server"', 'Set command: node, args: /path/to/attestr/src/mcp/index.js', 'Add env: CROO_SDK_KEY = sk-...', 'Click Save and reload Cursor'].map((s,i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10, fontSize: '.84rem', color: C.muted }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f5f0ff',
                      color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.65rem', fontWeight: 800, flexShrink: 0 }}>{i+1}</div>
                    {s}
                  </div>
                ))}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 10 }}>Option B — Config file</h3>
              <Code lang="~/.cursor/mcp.json">{`{
  "mcpServers": {
    "attestr": {
      "command": "node",
      "args": ["/path/to/attestr/src/mcp/index.js"],
      "env": {
        "CROO_SDK_KEY": "sk-your-key-here"
      }
    }
  }
}`}</Code>
            </Section>

            <Section id="cap" title="🔗 CAP — CROO Agent Protocol">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                CAP is the on-chain agent coordination protocol built by CROO on Base mainnet. Every Attestr interaction flows through a complete CAP lifecycle settled in USDC.
              </p>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 16 }}>Lifecycle</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { step:'negotiate',   actor:'Coordinator',  desc:'Coordinator calls negotiateOrder() on a sub-agent service' },
                  { step:'accept',      actor:'Sub-agent',    desc:'Agent accepts — NegotiationCreated event fires, on-chain order created' },
                  { step:'pay',         actor:'Coordinator',  desc:'Coordinator pays USDC when OrderCreated fires' },
                  { step:'deliver',     actor:'Sub-agent',    desc:'Agent processes task and calls deliverOrder() with result JSON' },
                  { step:'complete',    actor:'Coordinator',  desc:'Coordinator calls getDelivery(), OrderCompleted event fires' },
                ].map((l, i, arr) => (
                  <div key={l.step} style={{ display: 'flex', gap: 16, paddingBottom: 16, position: 'relative' }}>
                    {i < arr.length - 1 && (
                      <div style={{ position: 'absolute', left: 16, top: 34, bottom: 0, width: 2,
                        background: '#5DC82A33', zIndex: 0 }} />
                    )}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: '#5DC82A15', border: '1.5px solid #5DC82A44',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.65rem', fontWeight: 800, color: '#5DC82A', zIndex: 1 }}>
                      {i+1}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '.8rem', fontWeight: 800, color: '#5DC82A' }}>{l.step}</span>
                        <span style={{ fontSize: '.7rem', padding: '2px 8px', borderRadius: 6,
                          background: l.actor==='Coordinator' ? C.bgBlue : '#f5f0ff',
                          color: l.actor==='Coordinator' ? C.blue : '#7c3aed', fontWeight: 600 }}>{l.actor}</span>
                      </div>
                      <div style={{ fontSize: '.83rem', color: C.muted }}>{l.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12, marginTop: 28 }}>Coordinator dual role</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { role:'Provider', color: C.blue, desc:'Accepts NegotiationCreated from users. Waits for OrderPaid, runs pipeline, calls deliverOrder.' },
                  { role:'Requester', color:'#7c3aed', desc:'Calls negotiateOrder on each sub-agent. Pays when OrderCreated fires. Waits for OrderCompleted, then calls getDelivery.' },
                ].map(r => (
                  <div key={r.role} style={{ background: r.color+'08', border:`1px solid ${r.color}22`, borderRadius:14, padding:'16px' }}>
                    <div style={{ fontWeight:800, color:r.color, marginBottom:8 }}>{r.role}</div>
                    <div style={{ fontSize:'.82rem', color:C.muted, lineHeight:1.65 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="a2a" title="🤝 A2A — Agent-to-Agent Standard">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Attestr is compatible with Google's A2A open standard, enabling any A2A-compliant agent to discover and call Attestr tools without human intervention.
              </p>
              <Code lang="A2A Agent Card (attestr/.well-known/agent.json)">{`{
  "name": "Attestr",
  "description": "Web3 intelligence: contract risk, vault analysis, DeFi research",
  "url": "https://attestr.croo.network",
  "version": "1.0.0",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false
  },
  "skills": [
    {
      "id": "check_contract_risk",
      "name": "Contract Risk Check",
      "description": "Analyze a Base address for risk. Returns SAFE/CAUTION/DANGEROUS.",
      "inputModes": ["text"],
      "outputModes": ["text"]
    },
    {
      "id": "analyze_hyperliquid_vault",
      "name": "Hyperliquid Vault Analysis",
      "description": "Returns TVL, APR, risk score and YES/NO deposit recommendation."
    }
  ]
}`}</Code>
              <Callout type="info">
                A2A task messages are routed through the Coordinator agent. The A2A envelope is unwrapped and the appropriate Attestr tool is called automatically.
              </Callout>
            </Section>

            <Section id="tools" title="📦 Tool Reference">
              <ToolCard
                name="check_contract_risk"
                color={C.green} price="$0.01"
                desc="Analyze any Base mainnet address for risk signals."
                params={[{ name:'address', type:'string', required:true, desc:'Ethereum address (0x...) on Base mainnet to analyze' }]}
                returns="{ address, badge: 'SAFE'|'CAUTION'|'DANGEROUS', riskScore: 0-100, reasons: string[], report: string, analyzedAt: ISO8601 }"
              />
              <ToolCard
                name="analyze_hyperliquid_vault"
                color={C.blue} price="$0.05"
                desc="Full vault intelligence report for any Hyperliquid vault address."
                params={[{ name:'vault_address', type:'string', required:true, desc:'Hyperliquid vault address (0x...)' }]}
                returns="{ vaultAddress, name, leader, tvlUsd, apr, commission, followers, maxFollowers, capacityPct, isClosed, badge, riskScore, depositRecommendation: 'YES'|'NO', recommendationReason, report, analyzedAt }"
              />
              <ToolCard
                name="research_web3"
                color="#f59e0b" price="$0.01"
                desc="Live web research + source verification + AI synthesis on any DeFi topic."
                params={[{ name:'query', type:'string', required:true, desc:'Natural language research question or DeFi topic' }]}
                returns="{ query, executiveSummary, keyFindings: string[], riskAssessment, recommendations: string[], confidenceScore: 0-1, verifiedSources: string[], unverifiedSources: string[], report, synthesizedAt }"
              />
              <ToolCard
                name="full_due_diligence"
                color="#a78bfa" price="$0.02"
                desc="Combined research + contract risk analysis in one unified report."
                params={[{ name:'query', type:'string', required:true, desc:'Research query — include a 0x address to trigger on-chain risk analysis' }]}
                returns="{ query, research: WebResearchResult, risk: ContractRiskResult|null, overallConfidence: 0-1, combinedReport: string (Markdown), analyzedAt }"
              />
            </Section>

            <Section id="architecture" title="🏗️ Architecture">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Attestr is a 4-process multi-agent system. Each agent is a long-running Node.js process connected to the CROO WebSocket, responding to CAP lifecycle events. Agents never call each other directly — all coordination is on-chain via CROO.
              </p>
              <Code lang="Sequential pipeline">{`User Request
     │
     ▼
┌─────────────────────────────────────────────┐
│            Coordinator Agent                │
│  (provider for users, requester for agents) │
│                                             │
│  userOrders Map      → routes OrderPaid     │
│  pendingNegotiations → routes OrderCreated  │
│  pendingOrders       → routes OrderCompleted│
└─────────┬───────────────────────────────────┘
          │ callSubAgent() — 5min timeout each
          ▼
   ┌──────────────┐
   │ Web Research │  DuckDuckGo Instant Answer API
   │    Agent     │  Returns: WebResearchResult { findings: Finding[] }
   └──────┬───────┘
          │
          ▼
   ┌──────────────────┐
   │ Source Verif.    │  HTTP HEAD checks all URLs
   │     Agent        │  Returns: SourceVerificationResult
   └──────┬───────────┘
          │
          ▼
   ┌──────────────┐
   │  Synthesis   │  Calls claude-sonnet-4-6
   │    Agent     │  Returns: { summary, keyFindings }
   └──────┬───────┘
          │
          ▼
   Coordinator delivers final result to user`}</Code>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 24 }}>
                {[
                  { label:'State Maps', items:['userOrders — order_id → requirements','pendingNegotiations — neg_id → {resolve,reject}','pendingOrders — order_id → {resolve,reject}'] },
                  { label:'Timeouts', items:['5 min — negotiation phase','5 min — delivery phase','Nested inside callSubAgent()'] },
                  { label:'Shared Types', items:['ResearchTask','WebResearchResult','SourceVerificationResult','SynthesisInput / SynthesisResult'] },
                ].map(g => (
                  <div key={g.label} style={{ background: C.bgSoft, border:`1px solid ${C.border}`, borderRadius:12, padding:'14px' }}>
                    <div style={{ fontWeight:700, fontSize:'.8rem', color:C.navy, marginBottom:10 }}>{g.label}</div>
                    {g.items.map(i => (
                      <div key={i} style={{ fontFamily:'monospace', fontSize:'.72rem', color:C.muted,
                        marginBottom:6, lineHeight:1.4 }}>{i}</div>
                    ))}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="env" title="🔑 Environment Variables">
              <div style={{ background: C.bgSoft, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'.85rem' }}>
                  <thead>
                    <tr style={{ background:C.bgBlue, borderBottom:`1px solid ${C.border}` }}>
                      {['Variable','Required For','Description'].map(h => (
                        <th key={h} style={{ padding:'10px 16px', textAlign:'left',
                          fontSize:'.7rem', fontWeight:700, color:C.ocean,
                          textTransform:'uppercase', letterSpacing:'.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { v:'CROO_SDK_KEY_COORDINATOR',          f:'Coordinator Agent',      d:'CROO SDK key for the coordinator' },
                      { v:'CROO_SDK_KEY_WEB_RESEARCH',         f:'Web Research Agent',     d:'CROO SDK key for web research agent' },
                      { v:'CROO_SDK_KEY_SOURCE_VERIFICATION',  f:'Source Verif. Agent',    d:'CROO SDK key for source verification agent' },
                      { v:'CROO_SDK_KEY_SYNTHESIS',            f:'Synthesis Agent',        d:'CROO SDK key for synthesis agent' },
                      { v:'CROO_SERVICE_ID_WEB_RESEARCH',      f:'Coordinator',            d:'Service ID of the web research agent on CROO' },
                      { v:'CROO_SERVICE_ID_SOURCE_VERIFICATION',f:'Coordinator',           d:'Service ID of the source verification agent' },
                      { v:'CROO_SERVICE_ID_SYNTHESIS',         f:'Coordinator',            d:'Service ID of the synthesis agent' },
                      { v:'ANTHROPIC_API_KEY',                 f:'Synthesis Agent',        d:'API key for claude-sonnet-4-6 calls' },
                    ].map((r, i) => (
                      <tr key={r.v} style={{ borderBottom:`1px solid ${C.borderL}`, background: i%2===0?'#fff':C.bgSoft }}>
                        <td style={{ padding:'12px 16px', fontFamily:'monospace', fontSize:'.75rem', fontWeight:700, color:'#7c3aed' }}>{r.v}</td>
                        <td style={{ padding:'12px 16px', fontSize:'.8rem', color:C.blue, fontWeight:600 }}>{r.f}</td>
                        <td style={{ padding:'12px 16px', fontSize:'.8rem', color:C.muted }}>{r.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Code lang=".env">{`# Copy .env.example and fill in these values
CROO_SDK_KEY_COORDINATOR=sk-...
CROO_SDK_KEY_WEB_RESEARCH=sk-...
CROO_SDK_KEY_SOURCE_VERIFICATION=sk-...
CROO_SDK_KEY_SYNTHESIS=sk-...

CROO_SERVICE_ID_WEB_RESEARCH=svc-...
CROO_SERVICE_ID_SOURCE_VERIFICATION=svc-...
CROO_SERVICE_ID_SYNTHESIS=svc-...

ANTHROPIC_API_KEY=sk-ant-...`}</Code>
            </Section>

          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
