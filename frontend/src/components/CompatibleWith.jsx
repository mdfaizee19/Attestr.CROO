import { C } from '../tokens'
import Tag from './Tag'
import HyperliquidLogo from './HyperliquidLogo'
import ClaudeLogo from './ClaudeLogo'
import ClaudeCodeLogo from './ClaudeCodeLogo'
import CursorLogo from './CursorLogo'

const PLATFORMS = [
  {
    Logo: () => <ClaudeLogo size={130}/>,
    bg: '#1a0e0a',
    border: '#D9775733',
    accent: '#D97757',
    name: 'Claude',
    badge: 'MCP Compatible',
    desc: 'Use Attestr directly in Claude Desktop chat. All four tools available inline — just ask Claude to check a contract or research a protocol.',
    config: `~/.claude/claude_desktop_config.json`,
    cmd: `{\n  "mcpServers": {\n    "attestr": {\n      "command": "node",\n      "args": ["./src/mcp/index.js"]\n    }\n  }\n}`,
  },
  {
    Logo: () => <ClaudeCodeLogo size={180}/>,
    bg: '#1a0e0a',
    border: '#D9775733',
    accent: '#D97757',
    name: 'Claude Code',
    badge: 'MCP Compatible',
    desc: 'Add Attestr to Claude Code CLI. Risk checks and research run from your terminal while you build DeFi integrations.',
    config: 'Terminal',
    cmd: `claude mcp add attestr \\\n  --command node \\\n  --args "./src/mcp/index.js"`,
  },
  {
    Logo: () => <CursorLogo size={180}/>,
    bg: '#0a0a0a',
    border: '#ffffff22',
    accent: '#ffffff',
    name: 'Cursor',
    badge: 'MCP Compatible',
    desc: 'Wire Attestr into Cursor IDE. Audit contracts and research protocols without leaving your editor.',
    config: 'Settings → Features → MCP',
    cmd: `{\n  "mcpServers": {\n    "attestr": {\n      "command": "node",\n      "args": ["./src/mcp/index.js"]\n    }\n  }\n}`,
  },
  {
    Logo: () => <HyperliquidLogo size={200}/>,
    bg: '#061a18',
    border: '#4EEFD433',
    accent: '#4EEFD4',
    name: 'Hyperliquid',
    badge: 'MCP Compatible',
    desc: 'Attestr integrates directly with Hyperliquid vault data via MCP. Analyze any vault address before depositing — TVL, APR, risk score, recommendation.',
    config: 'Via analyze_hyperliquid_vault tool',
    cmd: `analyze_hyperliquid_vault({\n  vault_address: "0xdfc24b...df303"\n})`,
  },
]

const TOOLS = [
  { name:'check_contract_risk',       color:'#6EE04A', desc:'SAFE/CAUTION/DANGEROUS + 0–100 risk score' },
  { name:'analyze_hyperliquid_vault', color:'#4EEFD4', desc:'TVL, APR, commission, deposit recommendation' },
  { name:'research_web3',             color:'#f59e0b', desc:'Live research + AI synthesis + verified sources' },
  { name:'full_due_diligence',        color:'#a78bfa', desc:'Research + contract risk in one report' },
]

export default function CompatibleWith() {
  return (
    <section id="mcp" style={{ padding:'100px 0', background:C.bg2, borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px' }}>

        <div style={{ textAlign:'center', marginBottom:64 }}>
          <Tag>MCP Integrations</Tag>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:14 }}>
            Available in <span style={{ color:C.green }}>Claude, Claude Code, Cursor</span><br/>
            & Hyperliquid
          </h2>
          <p style={{ color:C.muted, fontSize:'1rem', maxWidth:520, margin:'0 auto',
            lineHeight:1.7, fontFamily:'Times New Roman, serif' }}>
            All four platforms are fully MCP compatible. Add once, use everywhere.
          </p>
        </div>

        {/* Tools strip */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12,
          padding:'20px 24px', marginBottom:48, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0 }}>
          {TOOLS.map((t, i) => (
            <div key={t.name} style={{ padding:'0 20px',
              borderRight: i<3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily:'SF Mono, monospace', fontSize:'.72rem',
                fontWeight:700, color:t.color, marginBottom:4 }}>{t.name}</div>
              <div style={{ fontSize:'.78rem', color:C.muted }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Platform cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:20 }}>
          {PLATFORMS.map(p => (
            <div key={p.name} style={{ background:p.bg, border:`1.5px solid ${p.border}`,
              borderRadius:16, overflow:'hidden', transition:'all .25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent+'66'; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = p.border; e.currentTarget.style.transform='' }}>

              {/* Logo area */}
              <div style={{ padding:'28px 28px 20px', borderBottom:`1px solid ${C.borderL}`,
                display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <p.Logo />
                <span style={{ padding:'4px 10px', borderRadius:4, fontSize:'.7rem', fontWeight:700,
                  background:p.accent+'18', color:p.accent, border:`1px solid ${p.accent}33`,
                  fontFamily:'Arial, sans-serif', whiteSpace:'nowrap', alignSelf:'flex-start' }}>
                  ✓ {p.badge}
                </span>
              </div>

              {/* Info */}
              <div style={{ padding:'20px 28px 24px' }}>
                <p style={{ fontSize:'.85rem', color:C.muted, lineHeight:1.7, marginBottom:18,
                  fontFamily:'Times New Roman, serif' }}>{p.desc}</p>
                <div style={{ background:C.bg2, borderRadius:10, overflow:'hidden', border:`1px solid ${C.border}` }}>
                  <div style={{ padding:'8px 14px', borderBottom:`1px solid ${C.border}`,
                    display:'flex', alignItems:'center', gap:6 }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => (
                      <div key={c} style={{ width:8, height:8, borderRadius:'50%', background:c }}/>
                    ))}
                    <span style={{ fontSize:'.65rem', color:C.faint, marginLeft:'auto',
                      fontFamily:'monospace' }}>{p.config}</span>
                  </div>
                  <pre style={{ padding:'14px 16px', color:'#86efac', fontSize:'.74rem',
                    lineHeight:1.7, margin:0, overflowX:'auto', fontFamily:'SF Mono, monospace' }}>{p.cmd}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
