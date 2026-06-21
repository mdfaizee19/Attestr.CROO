import { C } from '../tokens'
import Tag from './Tag'

const PHASES = [
  {
    phase:'Phase 1', label:'Now', status:'live', color:C.green,
    title:'Core Intelligence Network',
    items:['Web Research Agent','Source Verification Agent','Synthesis Agent (Claude)','Contract Risk Check','Hyperliquid Vault Analysis','MCP Server'],
    note: null,
  },
  {
    phase:'Phase 2', label:'Post Seed Funding', status:'soon', color:C.blue,
    title:'DeFi Protocol Connectors',
    items:['Aave v3 Position Analysis','Uniswap v4 Pool Intelligence','Compound Risk Monitoring','GMX Vault Connector','Pendle Yield Analysis','Morpho Blue Integration'],
    note:'🚀 Launching after seed funding',
  },
  {
    phase:'Phase 3', label:'Post Series A', status:'future', color:'#a78bfa',
    title:'Multi-Chain & Portfolio Layer',
    items:['Multi-chain (Arbitrum, OP, Polygon)','Portfolio Risk Dashboard','Real-time Alert System','Attestr SDK for Developers','On-chain Reputation Scores','Enterprise API'],
    note:'📈 Planned for Series A milestone',
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" style={{ padding:'100px 0', background:C.bg2, borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 28px' }}>
        <div style={{ textAlign:'center', marginBottom:60 }}>
          <Tag>Roadmap</Tag>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:12 }}>
            Building the future of <span style={{ color:C.green }}>DeFi intelligence</span>
          </h2>
          <p style={{ color:C.muted, fontSize:'1rem', maxWidth:520, margin:'0 auto',
            lineHeight:1.7, fontFamily:'Times New Roman, serif' }}>
            Starting focused — expanding to every major DeFi protocol as we grow.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {PHASES.map(p => (
            <div key={p.phase} style={{ background:C.card, border:`1.5px solid ${p.status==='live'?p.color+'44':C.border}`,
              borderRadius:16, overflow:'hidden', opacity:p.status==='future'?.75:1 }}>
              {p.status==='live' && (
                <div style={{ height:3, background:`linear-gradient(90deg, ${p.color}, transparent)` }}/>
              )}
              <div style={{ padding:'22px 22px 20px', borderBottom:`1px solid ${C.borderL}`,
                display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'.68rem', fontWeight:800, color:C.faint,
                  textTransform:'uppercase', letterSpacing:'.1em', fontFamily:'Arial, sans-serif' }}>{p.phase}</span>
                <span style={{ fontSize:'.68rem', fontWeight:700, padding:'3px 9px', borderRadius:3,
                  background:p.color+'15', color:p.color, fontFamily:'Arial, sans-serif' }}>
                  {p.status==='live'?'● Live':p.status==='soon'?'Soon':'Planned'}
                </span>
              </div>
              <div style={{ padding:'18px 22px 22px' }}>
                <div style={{ fontSize:'.75rem', color:C.muted, marginBottom:6,
                  fontFamily:'Times New Roman, serif' }}>{p.label}</div>
                <h3 style={{ fontWeight:700, fontSize:'.95rem', color:C.white, marginBottom:18,
                  fontFamily:'Times New Roman, serif' }}>{p.title}</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {p.items.map(item => (
                    <div key={item} style={{ display:'flex', alignItems:'center', gap:10,
                      fontSize:'.82rem', color:C.muted, fontFamily:'Times New Roman, serif' }}>
                      <div style={{ width:16, height:16, borderRadius:'50%', flexShrink:0,
                        background:p.color+'15', color:p.color,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:'.55rem', fontWeight:800, fontFamily:'Arial, sans-serif' }}>
                        {p.status==='live'?'✓':p.status==='soon'?'→':'○'}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                {p.note && (
                  <div style={{ marginTop:18, padding:'10px 12px', borderRadius:8, fontSize:'.78rem',
                    background:p.color+'08', color:p.color, border:`1px solid ${p.color}20`,
                    fontFamily:'Times New Roman, serif' }}>{p.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
