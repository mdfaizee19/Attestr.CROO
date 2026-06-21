import { C } from '../tokens'
import Tag from './Tag'

const SERVICES = [
  { icon:'🏦', name:'Hyperliquid Vault Analysis', price:'$0.05',
    desc:'TVL, APR, commission, follower capacity, risk score and a clear YES/NO deposit recommendation — all from live on-chain data.' },
  { icon:'🔍', name:'Contract Risk Check', price:'$0.01',
    desc:'Scan any Base mainnet address. Source verification, proxy detection, suspicious activity scan. Returns SAFE / CAUTION / DANGEROUS badge.' },
  { icon:'🌐', name:'Web3 Research', price:'$0.01',
    desc:'Live web search + HTTP source verification + AI synthesis. Returns an intelligence report with confidence score and verified sources.' },
  { icon:'📋', name:'Full Due Diligence', price:'$0.02',
    desc:'Combined pipeline: deep web research + contract risk in one unified report. Include a 0x address to trigger on-chain analysis.' },
]

export default function Services() {
  return (
    <section id="services" style={{ padding:'100px 0', background:'#000', borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 28px' }}>

        <div style={{ textAlign:'center', marginBottom:60 }}>
          <Tag>Services</Tag>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700,
            fontFamily:'Times New Roman, serif', color:C.white, marginBottom:12 }}>
            Intelligence, <span style={{ color:C.green }}>on demand</span>
          </h2>
          <p style={{ color:C.muted, fontSize:'1rem', maxWidth:500, margin:'0 auto',
            lineHeight:1.7, fontFamily:'Times New Roman, serif' }}>
            Four specialist agents. Pay per query in USDC. Settled on Base mainnet.
          </p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:1, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>
          {SERVICES.map((s, i) => (
            <div key={s.name} style={{ background:C.card, padding:'32px 28px',
              borderRight: i%2===0 ? `1px solid ${C.border}` : 'none',
              borderBottom: i<2 ? `1px solid ${C.border}` : 'none',
              transition:'background .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = C.card2}
            onMouseLeave={e => e.currentTarget.style.background = C.card}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18 }}>
                <div style={{ width:48, height:48, borderRadius:10, background:'rgba(110,224,74,.08)',
                  border:`1px solid rgba(110,224,74,.15)`, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:'1.4rem' }}>{s.icon}</div>
                <span style={{ padding:'5px 12px', background:'rgba(110,224,74,.1)',
                  border:`1px solid rgba(110,224,74,.25)`, borderRadius:4,
                  fontSize:'.8rem', fontWeight:800, color:C.green, fontFamily:'Arial, sans-serif' }}>
                  {s.price} USDC
                </span>
              </div>
              <div style={{ fontWeight:700, fontSize:'1rem', color:C.white,
                fontFamily:'Times New Roman, serif', marginBottom:10 }}>{s.name}</div>
              <div style={{ fontSize:'.85rem', color:C.muted, lineHeight:1.7,
                fontFamily:'Times New Roman, serif' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
