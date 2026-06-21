import { Link } from 'react-router-dom'
import Logo from './Logo'
import CrooLogo from './CrooLogo'
import { C } from '../tokens'

export default function Footer() {
  return (
    <footer style={{ background:'#000', borderTop:`1px solid ${C.border}` }}>
      {/* Main footer */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'56px 28px 48px',
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:48 }}>

        {/* Brand */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
            <Logo size={32}/>
            <span style={{ fontWeight:700, color:C.white, fontSize:'1.1rem',
              fontFamily:'Times New Roman, serif' }}>Attestr</span>
          </div>
          <p style={{ fontSize:'.85rem', color:C.muted, lineHeight:1.7, marginBottom:20,
            fontFamily:'Times New Roman, serif', maxWidth:240 }}>
            Web3 intelligence network for DeFi research and smart contract analysis on Base mainnet.
          </p>
          <a href="https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3"
            target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'8px 14px',
              background:'rgba(110,224,74,.08)', border:`1px solid rgba(110,224,74,.25)`,
              borderRadius:6, textDecoration:'none', transition:'border-color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(110,224,74,.6)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(110,224,74,.25)'}>
            <CrooLogo square size={22}/>
            <span style={{ fontSize:'.78rem', color:C.green, fontWeight:700,
              fontFamily:'Arial, sans-serif' }}>Hire on CROO →</span>
          </a>
        </div>

        {/* Services */}
        <div>
          <div style={{ fontSize:'.7rem', fontWeight:700, color:C.faint, textTransform:'uppercase',
            letterSpacing:'.1em', marginBottom:18, fontFamily:'Arial, sans-serif' }}>Services</div>
          {[
            ['Contract Risk Check','$0.01 USDC'],
            ['Vault Analysis','$0.05 USDC'],
            ['Web3 Research','$0.01 USDC'],
            ['Full Due Diligence','$0.02 USDC'],
          ].map(([name, price]) => (
            <div key={name} style={{ display:'flex', justifyContent:'space-between',
              alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${C.borderL}` }}>
              <span style={{ fontSize:'.84rem', color:C.muted, fontFamily:'Times New Roman, serif' }}>{name}</span>
              <span style={{ fontSize:'.75rem', fontWeight:700, color:C.green, fontFamily:'Arial, sans-serif' }}>{price}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize:'.7rem', fontWeight:700, color:C.faint, textTransform:'uppercase',
            letterSpacing:'.1em', marginBottom:18, fontFamily:'Arial, sans-serif' }}>Resources</div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { label:'Trader Docs', to:'/docs/traders', internal:true },
              { label:'Developer Docs', to:'/docs/developers', internal:true },
              { label:'CROO Dashboard', href:'https://croo.network' },
              { label:'Hire the Agent', href:'https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3' },
              { label:'Base Mainnet', href:'https://base.org' },
            ].map(l => l.internal ? (
              <Link key={l.label} to={l.to}
                style={{ fontSize:'.85rem', color:C.muted, textDecoration:'none',
                  fontFamily:'Times New Roman, serif', transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color=C.green}
                onMouseLeave={e=>e.target.style.color=C.muted}>{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{ fontSize:'.85rem', color:C.muted, textDecoration:'none',
                  fontFamily:'Times New Roman, serif', transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color=C.green}
                onMouseLeave={e=>e.target.style.color=C.muted}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:`1px solid ${C.borderL}`, padding:'18px 28px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex',
          alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontSize:'.75rem', color:C.faint, fontFamily:'Times New Roman, serif' }}>
            © 2025 Attestr · Built on Base mainnet
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            {[['CAP','#6EE04A'],['MCP','#ffffff'],['Base','#0052ff']].map(([b,col]) => (
              <span key={b} style={{ fontSize:'.65rem', fontWeight:700, padding:'2px 8px', borderRadius:3,
                background:col+'12', color:col, border:`1px solid ${col}25`, fontFamily:'Arial, sans-serif' }}>{b}</span>
            ))}
            <a href="https://croo.network" target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:6, textDecoration:'none' }}>
              <span style={{ fontSize:'.72rem', color:C.faint, fontFamily:'Arial, sans-serif' }}>Powered by</span>
              <CrooLogo square size={20}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
