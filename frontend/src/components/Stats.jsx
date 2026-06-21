import { C } from '../tokens'

const DATA = [
  { val:'2',     label:'Orders Completed' },
  { val:'100%',  label:'Completion Rate'  },
  { val:'$0.16', label:'USDC Earned'      },
  { val:'Base',  label:'Mainnet'          },
]

export default function Stats() {
  return (
    <section style={{ padding:'0', background:'#000', borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1160, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {DATA.map((d,i) => (
            <div key={d.label} style={{ textAlign:'center', padding:'44px 20px',
              borderRight: i<3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontSize:'2rem', fontWeight:700, color:C.green, letterSpacing:'-.03em',
                fontFamily:'Times New Roman, serif', marginBottom:6 }}>{d.val}</div>
              <div style={{ fontSize:'.78rem', color:C.faint, fontFamily:'Arial, sans-serif',
                textTransform:'uppercase', letterSpacing:'.08em' }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
