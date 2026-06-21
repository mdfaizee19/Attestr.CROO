import { C } from '../tokens'
import CrooLogo from './CrooLogo'
import HyperliquidLogo from './HyperliquidLogo'
import ClaudeLogo from './ClaudeLogo'

const SCROLL_ITEMS = [
  'CAP Protocol', 'Base Mainnet', 'USDC Payments', 'MCP Server', 'A2A Compatible',
  'Human Hiring', 'Claude Integration', 'Cursor Integration', 'Claude Code Integration',
  'Hyperliquid Vaults', 'Contract Risk', 'Web3 Research', 'DeFi Intelligence',
]

export default function Sponsors() {
  return (
    <section style={{ background:'#000', borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>

      {/* ── Scrolling ticker ── */}
      <div style={{ overflow:'hidden', padding:'14px 0', borderBottom:`1px solid ${C.borderL}`, position:'relative' }}>
        <div style={{ display:'flex', gap:0, animation:'marquee 24s linear infinite', width:'max-content' }}>
          {[...SCROLL_ITEMS, ...SCROLL_ITEMS].map((item, i) => (
            <span key={i} style={{ padding:'0 28px', fontSize:'.75rem', fontWeight:700, color:C.faint,
              letterSpacing:'.1em', textTransform:'uppercase', fontFamily:'Arial, sans-serif',
              borderRight:`1px solid ${C.borderL}`, whiteSpace:'nowrap' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CROO featured banner ── */}
      <div style={{ padding:'52px 28px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:40 }}>

            {/* Left: CROO */}
            <div style={{ display:'flex', alignItems:'center', gap:24 }}>
              <div>
                <div style={{ fontSize:'.68rem', fontWeight:700, color:C.green,
                  letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12,
                  fontFamily:'Arial, sans-serif' }}>⚡ Primary Sponsor</div>
                <CrooLogo size={180} />
                <div style={{ fontSize:'.8rem', color:C.muted, marginTop:12, maxWidth:260,
                  lineHeight:1.6, fontFamily:'Times New Roman, serif' }}>
                  On-chain agent coordination protocol on Base. Powers the CAP lifecycle behind Attestr.
                </div>
              </div>
              <div style={{ width:1, height:80, background:C.border }}/>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[
                  { label:'CAP Compatible',  color:C.green },
                  { label:'A2A Compatible',  color:C.blue  },
                  { label:'MCP Compatible',  color:'#a78bfa' },
                  { label:'Human Hireable', color:'#f59e0b' },
                ].map(b => (
                  <div key={b.label} style={{ display:'flex', alignItems:'center', gap:10,
                    padding:'8px 14px', borderRadius:6, background:b.color+'0a',
                    border:`1px solid ${b.color}22` }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:b.color }}/>
                    <span style={{ fontSize:'.8rem', fontWeight:700, color:C.white,
                      fontFamily:'Arial, sans-serif' }}>{b.label}</span>
                    <span style={{ marginLeft:'auto', fontSize:'.65rem', fontWeight:700, padding:'2px 7px',
                      borderRadius:3, background:b.color+'15', color:b.color, fontFamily:'Arial, sans-serif' }}>✓</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ecosystem logos */}
            <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
              <div style={{ opacity:.55, transition:'opacity .2s' }}
                onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                onMouseLeave={e=>e.currentTarget.style.opacity='.55'}>
                <HyperliquidLogo size={200}/>
              </div>
              <div style={{ opacity:.55, transition:'opacity .2s' }}
                onMouseEnter={e=>e.currentTarget.style.opacity='1'}
                onMouseLeave={e=>e.currentTarget.style.opacity='.55'}>
                <ClaudeLogo size={180}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
