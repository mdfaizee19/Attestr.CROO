import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { C } from '../tokens'

const NAV = [
  { id: 'intro',       label: '🚀 Getting Started' },
  { id: 'hyperliquid', label: '🏦 Hyperliquid Vaults' },
  { id: 'research',    label: '🌐 Web3 Research' },
  { id: 'risk',        label: '🔍 Risk Analysis' },
  { id: 'reading',     label: '📊 Reading Results' },
  { id: 'pricing',     label: '💰 Pricing' },
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
      <pre style={{ padding: '18px 20px', color: '#86efac', fontSize: '.8rem', lineHeight: 1.8,
        overflowX: 'auto', margin: 0, whiteSpace: 'pre' }}>{children}</pre>
    </div>
  )
}

function Badge({ label, color, icon }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 999, fontSize: '.78rem', fontWeight: 700,
      background: color + '18', color, border: `1px solid ${color}33` }}>
      {icon} {label}
    </span>
  )
}

function Section({ id, title, children }) {
  return (
    <div id={id} style={{ paddingTop: 60, marginBottom: 64 }}>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: C.navy,
        letterSpacing: '-.03em', marginBottom: 6 }}>{title}</h2>
      <div style={{ width: 40, height: 3, background: C.blue, borderRadius: 2, marginBottom: 28 }}/>
      {children}
    </div>
  )
}

function Callout({ type = 'info', children }) {
  const styles = {
    info:    { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: 'ℹ️' },
    tip:     { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: '💡' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: '⚠️' },
  }
  const s = styles[type]
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12,
      padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 12 }}>
      <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
      <div style={{ fontSize: '.85rem', color: s.color, lineHeight: 1.65 }}>{children}</div>
    </div>
  )
}

function ResultCard({ badge, color, score, items }) {
  const circ = 2 * Math.PI * 36
  return (
    <div style={{ background: '#fff', border: `1.5px solid ${color}33`, borderRadius: 16,
      padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
      <svg viewBox="0 0 80 80" width={72} height={72} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
        <circle cx="40" cy="40" r="36" fill="none" stroke="#e8f2ff" strokeWidth="7"/>
        <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={`${(score/100)*circ} ${circ}`}/>
      </svg>
      <div>
        <Badge label={badge} color={color} icon={badge==='SAFE'?'✅':badge==='CAUTION'?'⚠️':'🚨'} />
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color, marginTop: 4 }}>{score}<span style={{ fontSize:'.8rem', color: C.faint }}>/100</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
          {items.map(i => (
            <div key={i} style={{ fontSize: '.78rem', color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: badge==='SAFE' ? C.green : '#ef4444' }}>{badge==='SAFE'?'✓':'✗'}</span>{i}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TraderDocs() {
  const [active, setActive] = useState('intro')

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 68, minHeight: '100vh', background: '#fff' }}>
        {/* Page header */}
        <div style={{ background: `linear-gradient(135deg, #f0f7ff, #e8f2ff)`,
          borderBottom: `1px solid ${C.border}`, padding: '48px 24px 40px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Link to="/" style={{ fontSize: '.82rem', color: C.muted, textDecoration: 'none' }}>Home</Link>
              <span style={{ color: C.faint }}>›</span>
              <span style={{ fontSize: '.82rem', color: C.ocean, fontWeight: 600 }}>Trader Docs</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
              <div>
                <h1 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 900,
                  letterSpacing: '-.03em', color: C.navy, marginBottom: 10 }}>
                  📈 Trader Documentation
                </h1>
                <p style={{ color: C.muted, fontSize: '1rem', maxWidth: 520, lineHeight: 1.7 }}>
                  Everything you need to use Attestr for Hyperliquid vault analysis, DeFi research, and smart contract risk checks — no code required.
                </p>
              </div>
              <Link to="/docs/developers" style={{ display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', background: '#fff', border: `1px solid ${C.border}`,
                borderRadius: 12, textDecoration: 'none', color: C.muted, fontSize: '.85rem',
                fontWeight: 600, transition: 'all .2s', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.ocean }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted }}>
                Switch to Developer Docs →
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
                    color: active === n.id ? C.ocean : C.muted,
                    background: active === n.id ? C.bgBlue : 'transparent',
                    textDecoration: 'none', transition: 'all .15s', display: 'block' }}
                  onMouseEnter={e => { if (active !== n.id) e.currentTarget.style.background = C.bgSoft }}
                  onMouseLeave={e => { if (active !== n.id) e.currentTarget.style.background = 'transparent' }}>
                  {n.label}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 32, padding: '16px', background: '#0a0a0a', borderRadius: 14 }}>
              <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.4)', marginBottom: 8,
                textTransform: 'uppercase', letterSpacing: '.08em' }}>Need help?</div>
              <a href="https://croo.network" target="_blank" rel="noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '8px 12px',
                  background: '#5DC82A', color: '#000', fontWeight: 700, fontSize: '.8rem',
                  borderRadius: 8, textDecoration: 'none' }}>
                Try on CROO →
              </a>
            </div>
          </aside>

          {/* Content */}
          <main style={{ paddingTop: 16, minWidth: 0 }}>

            <Section id="intro" title="Getting Started">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Attestr is a Web3 intelligence agent available on the CROO Network. As a trader, you can use it to instantly analyze Hyperliquid vaults before depositing, research any DeFi protocol, and check smart contract risk — all powered by live on-chain data.
              </p>
              <Callout type="tip">
                No code needed. Access Attestr through CROO Network's dashboard, or use it directly inside Claude via MCP. Each query costs as little as $0.01 USDC.
              </Callout>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                {[
                  { icon:'🏦', label:'Vault Analysis', cost:'$0.05' },
                  { icon:'🔍', label:'Risk Check',     cost:'$0.01' },
                  { icon:'🌐', label:'Research',       cost:'$0.01' },
                ].map(s => (
                  <div key={s.label} style={{ background: C.bgSoft, border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{s.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '.88rem', color: C.navy, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontWeight: 800, color: C.green, fontSize: '.85rem' }}>{s.cost} USDC</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="hyperliquid" title="🏦 Hyperliquid Vault Analysis">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Before depositing into any Hyperliquid vault, run an analysis to get TVL, APR, commission, follower capacity, and a direct YES/NO deposit recommendation with risk scoring.
              </p>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12 }}>Example query on CROO</h3>
              <Code lang="CROO / Claude MCP">{`analyze_hyperliquid_vault({
  vault_address: "0xdfc24b077bc1425ad1dea75bcb6f8158e10df303"
})`}</Code>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12, marginTop: 28 }}>What you get back</h3>
              <div style={{ background: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px', marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
                  {[
                    { label: 'Vault Name',   value: 'HLP (Hyperliquidity Provider)' },
                    { label: 'TVL',          value: '$12.4M USDC' },
                    { label: 'APR',          value: '18.4%' },
                    { label: 'Commission',   value: '10%' },
                    { label: 'Followers',    value: '847' },
                    { label: 'Capacity',     value: '68% used' },
                  ].map(f => (
                    <div key={f.label}>
                      <div style={{ fontSize: '.7rem', fontWeight: 700, color: C.faint,
                        textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{f.label}</div>
                      <div style={{ fontWeight: 700, color: C.navy, fontSize: '.9rem' }}>{f.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 16,
                  borderTop: `1px solid ${C.borderL}` }}>
                  <Badge label="DEPOSIT: YES" color={C.green} icon="✅"/>
                  <Badge label="Risk Score: 18/100" color={C.ocean} icon="🛡️"/>
                </div>
              </div>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12, marginTop: 28 }}>Key metrics explained</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { term: 'TVL (Total Value Locked)', def: 'Total USDC deposited in the vault. Higher TVL generally means more liquidity, but watch for rapid changes.' },
                  { term: 'APR', def: 'Annualized return based on recent vault performance. Does NOT include IL (impermanent loss) in delta-neutral strategies.' },
                  { term: 'Commission', def: 'Percentage of profits taken by the vault leader. 0% is best for depositors.' },
                  { term: 'Capacity %', def: 'How full the vault is relative to its maximum. A vault near 100% capacity may reject new deposits.' },
                  { term: 'Risk Score', def: 'Attestr\'s 0–100 risk score. Under 30 = SAFE, 30–60 = CAUTION, above 60 = DANGEROUS.' },
                ].map(f => (
                  <div key={f.term} style={{ background: '#fff', border: `1px solid ${C.borderL}`,
                    borderRadius: 12, padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '.88rem', color: C.ocean, marginBottom: 4 }}>{f.term}</div>
                    <div style={{ fontSize: '.83rem', color: C.muted, lineHeight: 1.6 }}>{f.def}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="research" title="🌐 Web3 Research">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Ask any DeFi question in plain English. Attestr searches the live web, verifies each source, and synthesizes an intelligence report using Claude.
              </p>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12 }}>Example queries</h3>
              <Code lang="Natural language">{`"Is Hyperliquid safe to use?"
"What are the risks of Pendle finance yield trading?"
"Explain how Morpho Blue lending works"
"What is the current state of GMX v2 liquidity?"
"Compare Aave vs Compound interest rates on USDC"`}</Code>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12, marginTop: 28 }}>Research report structure</h3>
              <div style={{ background: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: 16, padding: '24px' }}>
                {[
                  { field: 'executiveSummary', desc: '2–3 sentence overview of the topic', color: C.blue },
                  { field: 'keyFindings',      desc: 'Array of critical facts discovered', color: '#f59e0b' },
                  { field: 'riskAssessment',   desc: 'Overall risk level and main concerns', color: '#ef4444' },
                  { field: 'recommendations',  desc: 'Actionable steps you should take', color: C.green },
                  { field: 'verifiedSources',  desc: 'URLs confirmed live via HTTP check', color: C.ocean },
                  { field: 'confidenceScore',  desc: '0–1 score based on source quality', color: '#a78bfa' },
                ].map(f => (
                  <div key={f.field} style={{ display: 'flex', gap: 14, paddingBottom: 12,
                    marginBottom: 12, borderBottom: `1px solid ${C.borderL}` }}>
                    <div style={{ fontFamily: 'SF Mono, Fira Code, monospace', fontSize: '.75rem',
                      fontWeight: 700, color: f.color, minWidth: 160, paddingTop: 1 }}>{f.field}</div>
                    <div style={{ fontSize: '.83rem', color: C.muted }}>{f.desc}</div>
                  </div>
                ))}
              </div>

              <Callout type="info">
                All sources are HTTP HEAD verified before they appear in <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 5px',borderRadius:4 }}>verifiedSources</code>. Unverified URLs are separated into <code style={{ fontFamily:'monospace',background:'#e8f2ff',padding:'1px 5px',borderRadius:4 }}>unverifiedSources</code> so you always know what to trust.
              </Callout>
            </Section>

            <Section id="risk" title="🔍 Risk Analysis">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 20 }}>
                Check any Base mainnet address before interacting with it. Attestr analyzes source code, proxy patterns, and on-chain activity.
              </p>

              <Code lang="Contract address">{`check_contract_risk({
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
})`}</Code>

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 16, marginTop: 28 }}>Risk badge examples</h3>
              <ResultCard badge="SAFE" color={C.green} score={10}
                items={['Verified source code on Basescan','Proxy implementation detected & valid','No suspicious on-chain activity']} />
              <ResultCard badge="CAUTION" color="#f59e0b" score={48}
                items={['Unaudited contract','High recent volume spike','Review before interacting']} />
              <ResultCard badge="DANGEROUS" color="#ef4444" score={82}
                items={['Unverified source code','Suspicious wallet interactions','Known risk pattern detected']} />

              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12, marginTop: 28 }}>When to run a risk check</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Before approving a new token contract in your wallet',
                  'Before depositing into an unfamiliar DeFi protocol',
                  'When a project shares a contract address on social media',
                  'Before bridging assets to a new protocol on Base',
                  'As part of your pre-trade checklist on any new dApp',
                ].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '.85rem', color: C.muted }}>
                    <span style={{ color: C.green, fontWeight: 700, flexShrink: 0 }}>✓</span>{s}
                  </div>
                ))}
              </div>
            </Section>

            <Section id="reading" title="📊 Reading Your Results">
              <h3 style={{ fontWeight: 800, fontSize: '1rem', color: C.navy, marginBottom: 12 }}>Risk score bands</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {[
                  { range:'0–29',  badge:'SAFE',      color: C.green,   advice:'Generally safe to interact with. Still do your own research.' },
                  { range:'30–59', badge:'CAUTION',   color:'#f59e0b',  advice:'Elevated risk. Read the fine print. Consider a small test amount first.' },
                  { range:'60–100',badge:'DANGEROUS', color:'#ef4444',  advice:'High risk detected. Avoid unless you fully understand the contract and accept the risk.' },
                ].map(b => (
                  <div key={b.badge} style={{ display:'flex', alignItems:'flex-start', gap:16,
                    background:'#fff', border:`1px solid ${b.color}33`, borderRadius:14, padding:'16px 18px' }}>
                    <div style={{ fontSize:'1.5rem', fontWeight:900, color:b.color, minWidth:56 }}>{b.range}</div>
                    <div>
                      <Badge label={b.badge} color={b.color} icon={b.badge==='SAFE'?'✅':b.badge==='CAUTION'?'⚠️':'🚨'}/>
                      <div style={{ fontSize:'.83rem', color:C.muted, marginTop:8 }}>{b.advice}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Callout type="warning">
                Attestr provides intelligence — not financial advice. Always combine results with your own research. A SAFE badge means no technical red flags were found, not that the protocol is profitable or risk-free.
              </Callout>
            </Section>

            <Section id="pricing" title="💰 Pricing">
              <p style={{ color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>
                Pay only for what you use. All prices are in USDC, settled on Base. No subscriptions. No hidden fees.
              </p>
              <div style={{ background: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: 20, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.88rem' }}>
                  <thead>
                    <tr style={{ background: C.bgBlue, borderBottom: `1px solid ${C.border}` }}>
                      {['Tool','What you get','Price'].map(h => (
                        <th key={h} style={{ padding: '12px 18px', textAlign: 'left',
                          fontWeight: 700, fontSize: '.75rem', color: C.ocean,
                          textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { tool:'Hyperliquid Vault Analysis', what:'TVL, APR, commission, risk score, YES/NO recommendation', price:'$0.05' },
                      { tool:'Contract Risk Check',        what:'SAFE/CAUTION/DANGEROUS badge, 0–100 risk score, findings', price:'$0.01' },
                      { tool:'Web3 Research',              what:'Executive summary, key findings, verified sources, confidence score', price:'$0.01' },
                      { tool:'Full Due Diligence',         what:'Research + contract risk combined in one report', price:'$0.02' },
                    ].map((r, i) => (
                      <tr key={r.tool} style={{ borderBottom: i < 3 ? `1px solid ${C.borderL}` : 'none',
                        background: i % 2 === 0 ? '#fff' : C.bgSoft }}>
                        <td style={{ padding: '14px 18px', fontWeight: 700, color: C.navy }}>{r.tool}</td>
                        <td style={{ padding: '14px 18px', color: C.muted, fontSize: '.82rem' }}>{r.what}</td>
                        <td style={{ padding: '14px 18px', fontWeight: 800, color: C.green }}>{r.price} USDC</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Callout type="tip">
                Running a Full Due Diligence ($0.02) is cheaper than running Research ($0.01) + Risk Check ($0.01) separately, and gives you a unified report.
              </Callout>
            </Section>

          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
