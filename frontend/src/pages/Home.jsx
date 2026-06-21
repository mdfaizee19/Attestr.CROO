import { Link } from 'react-router-dom'
import Navbar         from '../components/Navbar'
import Hero           from '../components/Hero'
import DocsBanner     from '../components/DocsBanner'
import Sponsors       from '../components/Sponsors'
import Services       from '../components/Services'
import Protocols      from '../components/Protocols'
import CompatibleWith from '../components/CompatibleWith'
import Roadmap        from '../components/Roadmap'
import Stats          from '../components/Stats'
import Footer         from '../components/Footer'
import CrooLogo       from '../components/CrooLogo'
import { C } from '../tokens'

/* ── COMMUNITIES ── */
const COMMUNITIES = [
  { icon:'💬', name:'CROO Discord',      desc:'Main community for CROO agents and builders',     href:'https://croo.network', color:C.green },
  { icon:'🐦', name:'Attestr on X',      desc:'Updates, announcements and DeFi intelligence tips', href:'https://x.com',        color:'#1d9bf0' },
  { icon:'📚', name:'CROO Docs',         desc:'Full CAP, A2A & MCP developer documentation',      href:'https://croo.network', color:'#a78bfa' },
  { icon:'🤖', name:'Agent Marketplace', desc:'Browse and hire all CROO agents on Base mainnet',  href:'https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3', color:'#f59e0b' },
]

function Communities() {
  return (
    <section style={{ padding:'100px 0', background:C.bg3, borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 28px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'4px 14px',
            background:'rgba(110,224,74,.1)', border:'1px solid rgba(110,224,74,.25)',
            borderRadius:4, fontSize:'.72rem', fontWeight:700, color:C.green,
            letterSpacing:'.1em', textTransform:'uppercase', marginBottom:16,
            fontFamily:'Arial, sans-serif' }}>Community</div>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.4rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:12 }}>
            Join the <span style={{ color:C.green }}>conversation</span>
          </h2>
          <p style={{ color:C.muted, fontSize:'1rem', maxWidth:460, margin:'0 auto',
            lineHeight:1.7, fontFamily:'Times New Roman, serif' }}>
            Connect with DeFi traders, developers, and AI agent builders in the CROO ecosystem.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
          {COMMUNITIES.map(c => (
            <a key={c.name} href={c.href} target="_blank" rel="noreferrer"
              style={{ display:'flex', alignItems:'center', gap:18, padding:'24px 24px',
                background:C.card, border:`1px solid ${C.border}`, borderRadius:14,
                textDecoration:'none', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=c.color+'44'; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='' }}>
              <div style={{ width:52, height:52, borderRadius:12, background:c.color+'12',
                border:`1px solid ${c.color}25`, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:'.95rem', color:C.white,
                  fontFamily:'Times New Roman, serif', marginBottom:4 }}>{c.name}</div>
                <div style={{ fontSize:'.82rem', color:C.muted,
                  fontFamily:'Times New Roman, serif' }}>{c.desc}</div>
              </div>
              <div style={{ marginLeft:'auto', color:C.faint, fontSize:'1.1rem' }}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── HIRE CTA ── */
function HireCTA() {
  return (
    <section style={{ padding:'80px 0', background:C.card,
      borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:720, margin:'0 auto', padding:'0 28px', textAlign:'center' }}>
        <div style={{ marginBottom:12 }}>
          <CrooLogo square size={56} />
        </div>
        <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:700,
          fontFamily:'Times New Roman, serif', color:C.white, marginBottom:12 }}>
          Ready to <span style={{ color:C.green }}>hire Attestr?</span>
        </h2>
        <p style={{ color:C.muted, fontSize:'1rem', lineHeight:1.7, marginBottom:36,
          fontFamily:'Times New Roman, serif' }}>
          Available on the CROO agent marketplace. $0.01 USDC per check. No subscription.
          Hire as a human, an agent, or via MCP — your choice.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3"
            target="_blank" rel="noreferrer"
            style={{ padding:'13px 32px', background:C.green, color:'#000',
              fontWeight:700, fontSize:'1rem', borderRadius:6, textDecoration:'none',
              fontFamily:'Arial, sans-serif', transition:'opacity .2s',
              boxShadow:'0 0 32px rgba(110,224,74,.2)' }}
            onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
            onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
            Hire on CROO →
          </a>
          <a href="#mcp" style={{ padding:'13px 32px', background:'transparent', color:C.white,
            fontWeight:600, fontSize:'1rem', borderRadius:6, textDecoration:'none',
            fontFamily:'Arial, sans-serif', border:`1px solid ${C.border}`, transition:'border-color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=C.green}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            Use via MCP
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <DocsBanner />
      <Sponsors />
      <Services />
      <Protocols />
      <CompatibleWith />
      <Communities />
      <Roadmap />
      <Stats />
      <HireCTA />
      <Footer />
    </>
  )
}
