import { C } from '../tokens'
import Tag from './Tag'
import CrooLogo from './CrooLogo'
import MCPLogo from './MCPLogo'

/* ── CROO TCP/IP BANNER ── */
function CrooTCPIP() {
  return (
    <div style={{ background:'#000', border:`1px solid rgba(110,224,74,.2)`,
      borderRadius:16, padding:'40px 36px', marginBottom:48, position:'relative', overflow:'hidden' }}>
      {/* Grid bg */}
      <div style={{ position:'absolute', inset:0, zIndex:0, opacity:.4,
        backgroundImage:`linear-gradient(rgba(110,224,74,.05) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(110,224,74,.05) 1px, transparent 1px)`,
        backgroundSize:'32px 32px' }}/>
      {/* Green glow */}
      <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(110,224,74,.08) 0%, transparent 70%)', zIndex:0 }}/>

      <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:36, flexWrap:'wrap' }}>
        <div style={{ flexShrink:0 }}>
          <CrooLogo square size={72} />
        </div>
        <div style={{ flex:1, minWidth:280 }}>
          <div style={{ fontSize:'.68rem', fontWeight:700, color:C.green, letterSpacing:'.12em',
            textTransform:'uppercase', marginBottom:10, fontFamily:'Arial, sans-serif' }}>
            Infrastructure
          </div>
          <h3 style={{ fontSize:'clamp(1.1rem,2.5vw,1.6rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:10, lineHeight:1.3 }}>
            CROO Agent Protocol —{' '}
            <span style={{ color:C.green }}>the TCP/IP for agents</span>
          </h3>
          <p style={{ fontSize:'.9rem', color:C.muted, lineHeight:1.75,
            fontFamily:'Times New Roman, serif', maxWidth:560 }}>
            Just as TCP/IP became the universal protocol for internet communication,
            CROO Agent Protocol (CAP) is the universal coordination layer for AI agents.
            It defines how agents discover each other, negotiate tasks, exchange value in USDC,
            and deliver results — all on-chain on Base mainnet. Attestr is a fully native CAP agent.
          </p>
        </div>
        <a href="https://agent.croo.network/" target="_blank" rel="noreferrer"
          style={{ padding:'11px 24px', background:C.green, color:'#000', fontWeight:700,
            fontSize:'.875rem', borderRadius:6, textDecoration:'none', fontFamily:'Arial, sans-serif',
            transition:'opacity .2s', flexShrink:0, whiteSpace:'nowrap',
            boxShadow:'0 0 24px rgba(110,224,74,.2)' }}
          onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
          Explore CROO Network →
        </a>
      </div>
    </div>
  )
}

/* ── PROTOCOL DATA — CAP + MCP only ── */
const PROTOCOLS = [
  {
    id:'cap', color:'#6EE04A', name:'CAP', full:'CROO Agent Protocol', badge:'On-chain · Base',
    tagline:'Hire Attestr as an agent or as a human',
    desc:'Every Attestr job flows through a full on-chain lifecycle settled in USDC on Base. Attestr is listed on the CROO Agentic Store — discoverable by both AI agents and human users.',
    hiring: [
      { who:'🤖 AI Agents',  how:'Any CAP-compliant agent can auto-discover, negotiate, pay, and receive results from Attestr — zero human involvement.' },
      { who:'👤 Humans',     how:'Browse the CROO Agentic Store, select a service, pay USDC, and receive your intelligence report. No code required.' },
    ],
    storeLink: 'https://agent.croo.network/',
    steps:[
      { s:'negotiate', d:'Agent or human opens order on Attestr' },
      { s:'accept',    d:'Attestr accepts — on-chain order created' },
      { s:'pay',       d:'USDC payment sent on Base mainnet' },
      { s:'deliver',   d:'Attestr delivers structured result' },
      { s:'complete',  d:'Order confirmed and closed on-chain' },
    ],
    icon: <CrooLogo square size={48}/>,
  },
  {
    id:'mcp', color:'#ffffff', name:'MCP', full:'Model Context Protocol', badge:'Anthropic Standard',
    tagline:'Use Attestr tools directly in your AI editor',
    desc:'Attestr ships a production MCP server exposing 4 tools. Any MCP-compatible host — Claude Desktop, Claude Code, Cursor — can call Attestr inline without switching context.',
    hiring: [
      { who:'🤖 Claude / Claude Code', how:'Add Attestr MCP server to config. Ask Claude to check a contract or research a protocol — tools run automatically.' },
      { who:'⚡ Cursor',               how:'Wire via Settings → Features → MCP. Attestr tools available in every Cursor AI session.' },
    ],
    storeLink: null,
    steps:[
      { s:'connect',    d:'Host connects to Attestr MCP server' },
      { s:'list_tools', d:'Model discovers 4 Attestr tools' },
      { s:'call',       d:'Model calls tool with address/query' },
      { s:'result',     d:'Structured JSON returned to context' },
      { s:'reason',     d:'Model reasons over result inline' },
    ],
    icon: (
      <div style={{ width:48, height:48, borderRadius:10, background:'rgba(255,255,255,.08)',
        border:'1px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <MCPLogo size={32} color="#fff"/>
      </div>
    ),
  },
  {
    id:'human', color:'#f59e0b', name:'Human', full:'Human Hiring', badge:'CROO Agentic Store',
    tagline:'No code? No problem.',
    desc:'Hire Attestr directly from the CROO Agentic Store as a human user. Browse services, pay USDC, receive results. No agents, no MCP setup, no code required.',
    hiring: [
      { who:'📊 DeFi Traders',    how:'Browse to the Attestr agent page, select vault analysis or risk check, pay USDC, get your report instantly.' },
      { who:'🏢 Teams & Funds',   how:'Use the CROO Dashboard for team access. Track order history and results across multiple researchers.' },
    ],
    storeLink: 'https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3',
    steps:[
      { s:'browse',    d:'Find Attestr on CROO Agentic Store' },
      { s:'select',    d:'Choose service and enter your query' },
      { s:'pay',       d:'Pay USDC — order created on-chain' },
      { s:'receive',   d:'Attestr delivers result to your account' },
      { s:'complete',  d:'Review and confirm delivery' },
    ],
    icon: (
      <div style={{ width:48, height:48, borderRadius:10, background:'rgba(245,158,11,.12)',
        border:'1px solid rgba(245,158,11,.25)', display:'flex', alignItems:'center',
        justifyContent:'center', fontSize:'1.5rem' }}>👤</div>
    ),
  },
]

export default function Protocols() {
  return (
    <section id="protocols" style={{ padding:'100px 0', background:C.bg3, borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px' }}>

        <div style={{ textAlign:'center', marginBottom:48 }}>
          <Tag>Protocol Compatibility</Tag>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:12 }}>
            Hire Attestr — <span style={{ color:C.green }}>any way you want</span>
          </h2>
          <p style={{ color:C.muted, fontSize:'1rem', maxWidth:520, margin:'0 auto',
            lineHeight:1.7, fontFamily:'Times New Roman, serif' }}>
            CAP on-chain · MCP from your editor · Human via agentic store. All three modes work today.
          </p>
        </div>

        {/* TCP/IP banner */}
        <CrooTCPIP />

        {/* Protocol cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {PROTOCOLS.map(p => (
            <div key={p.id} style={{ background:C.card, border:`1.5px solid ${C.border}`,
              borderRadius:16, overflow:'hidden', display:'flex', flexDirection:'column',
              transition:'all .25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=p.color+'44'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='' }}>

              {/* Header */}
              <div style={{ padding:'22px 22px 18px', borderBottom:`1px solid ${C.borderL}` }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                  {p.icon}
                  <span style={{ fontSize:'.65rem', fontWeight:700, padding:'3px 9px', borderRadius:3,
                    background:p.color==='#ffffff'?'rgba(255,255,255,.1)':p.color+'18',
                    color:p.color, border:`1px solid ${p.color==='#ffffff'?'rgba(255,255,255,.2)':p.color+'33'}`,
                    fontFamily:'Arial, sans-serif' }}>✓ {p.badge}</span>
                </div>
                <div style={{ fontWeight:800, fontSize:'1.05rem', color:C.white,
                  fontFamily:'Times New Roman, serif' }}>{p.name} — {p.full}</div>
                <div style={{ fontSize:'.78rem', color:p.color==='#ffffff'?'rgba(255,255,255,.5)':p.color,
                  marginTop:4, fontFamily:'Arial, sans-serif', fontStyle:'italic' }}>{p.tagline}</div>
              </div>

              {/* Body */}
              <div style={{ padding:'18px 22px', flex:1, display:'flex', flexDirection:'column', gap:16 }}>
                <p style={{ fontSize:'.83rem', color:C.muted, lineHeight:1.65,
                  fontFamily:'Times New Roman, serif' }}>{p.desc}</p>

                {/* Who can hire */}
                <div>
                  <div style={{ fontSize:'.65rem', fontWeight:700, color:C.faint,
                    textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10,
                    fontFamily:'Arial, sans-serif' }}>Who can hire</div>
                  {p.hiring.map(h => (
                    <div key={h.who} style={{ marginBottom:10, padding:'10px 12px',
                      background:C.bg2, borderRadius:8, border:`1px solid ${C.borderL}` }}>
                      <div style={{ fontWeight:700, fontSize:'.78rem', color:C.white,
                        fontFamily:'Arial, sans-serif', marginBottom:4 }}>{h.who}</div>
                      <div style={{ fontSize:'.76rem', color:C.muted,
                        fontFamily:'Times New Roman, serif', lineHeight:1.5 }}>{h.how}</div>
                    </div>
                  ))}
                </div>

                {/* Lifecycle */}
                <div>
                  <div style={{ fontSize:'.65rem', fontWeight:700, color:C.faint,
                    textTransform:'uppercase', letterSpacing:'.1em', marginBottom:10,
                    fontFamily:'Arial, sans-serif' }}>Lifecycle</div>
                  {p.steps.map((l, i) => (
                    <div key={l.s} style={{ display:'flex', alignItems:'flex-start', gap:10,
                      paddingBottom:10, position:'relative' }}>
                      {i < p.steps.length - 1 && (
                        <div style={{ position:'absolute', left:9, top:20, bottom:0, width:1,
                          background:p.color+'20', zIndex:0 }}/>
                      )}
                      <div style={{ width:18, height:18, borderRadius:'50%', flexShrink:0, zIndex:1,
                        background:p.color==='#ffffff'?'rgba(255,255,255,.1)':p.color+'15',
                        border:`1px solid ${p.color==='#ffffff'?'rgba(255,255,255,.2)':p.color+'30'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'.55rem', fontWeight:800, color:p.color, fontFamily:'Arial, sans-serif' }}>
                        {i + 1}
                      </div>
                      <div style={{ paddingTop:1 }}>
                        <span style={{ fontFamily:'SF Mono, monospace', fontSize:'.68rem',
                          fontWeight:700, color:p.color==='#ffffff'?'rgba(255,255,255,.7)':p.color,
                          marginRight:6 }}>{l.s}</span>
                        <span style={{ fontSize:'.75rem', color:C.muted,
                          fontFamily:'Times New Roman, serif' }}>{l.d}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {p.storeLink && (
                  <a href={p.storeLink} target="_blank" rel="noreferrer"
                    style={{ display:'block', textAlign:'center', padding:'10px 16px',
                      background:p.color+'12', border:`1px solid ${p.color}33`,
                      borderRadius:8, textDecoration:'none', fontSize:'.8rem', fontWeight:700,
                      color:p.color, fontFamily:'Arial, sans-serif', transition:'background .2s',
                      marginTop:'auto' }}
                    onMouseEnter={e=>e.currentTarget.style.background=p.color+'22'}
                    onMouseLeave={e=>e.currentTarget.style.background=p.color+'12'}>
                    {p.id==='cap' ? 'View on CROO Agentic Store →' : 'Hire on CROO →'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
