import { useState, useEffect } from 'react'
import { C } from '../tokens'

const RESULTS = [
  { badge:'SAFE',      color:'#6EE04A', score:10, label:'Contract Risk',    tool:'check_contract_risk',       addr:'0x8335…02913' },
  { badge:'CAUTION',   color:'#f59e0b', score:48, label:'Vault Analysis',   tool:'analyze_hyperliquid_vault', addr:'HLP Vault'    },
  { badge:'DANGEROUS', color:'#ef4444', score:82, label:'Due Diligence',    tool:'full_due_diligence',        addr:'0xdead…beef'  },
]

export default function ProductShowcase() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % RESULTS.length), 2800)
    return () => clearInterval(t)
  }, [])

  const r = RESULTS[step]
  const circ = 2 * Math.PI * 46
  const findings = r.score < 30
    ? ['Verified source code','Proxy implementation found','No suspicious activity']
    : r.score < 60
    ? ['Unaudited contract','Elevated volume spike','Proceed with caution']
    : ['Unverified contract','Suspicious activity','High-risk pattern detected']

  return (
    <div style={{ background: 'linear-gradient(180deg, #000 0%, #080808 60%, #0f0f0f 100%)',
      padding: '0 24px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
        width:600, height:300, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(110,224,74,.06) 0%, transparent 70%)',
        pointerEvents:'none' }}/>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <div style={{ background: C.card, borderRadius: 16,
          boxShadow: '0 40px 100px rgba(0,0,0,.9), 0 0 0 1px rgba(110,224,74,.08)',
          border: `1px solid ${C.border}`, overflow: 'hidden' }}>

          {/* Chrome */}
          <div style={{ background: C.bg3, padding: '12px 18px',
            borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display:'flex', gap:6 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }}/>
              ))}
            </div>
            <div style={{ flex:1, background:C.bg2, borderRadius:6, padding:'6px 14px',
              border:`1px solid ${C.border}`, fontSize:'.78rem', color:C.faint,
              display:'flex', alignItems:'center', gap:8, fontFamily:'monospace' }}>
              Claude Desktop · attestr MCP · Base Mainnet
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:380 }}>
            {/* Left */}
            <div style={{ padding:28, borderRight:`1px solid ${C.borderL}`,
              fontFamily:'SF Mono, Fira Code, monospace', fontSize:'.8rem', lineHeight:1.9 }}>
              <div style={{ fontSize:'.68rem', fontWeight:700, color:C.faint,
                textTransform:'uppercase', letterSpacing:'.1em', marginBottom:16 }}>MCP Tool Call</div>
              <div style={{ color:C.muted }}>
                <span style={{ color:'#a78bfa' }}>use_mcp_tool</span>(<br/>
                &nbsp;&nbsp;<span style={{ color:C.green }}>server</span>: <span style={{ color:'#86efac' }}>"attestr"</span>,<br/>
                &nbsp;&nbsp;<span style={{ color:C.green }}>tool</span>: <span style={{ color:'#86efac' }}>"{r.tool}"</span>,<br/>
                &nbsp;&nbsp;<span style={{ color:C.green }}>args</span>: {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:C.green }}>"address"</span>: <span style={{ color:'#86efac' }}>"{r.addr}"</span><br/>
                &nbsp;&nbsp;{'}'}<br/>)
              </div>
              <div style={{ marginTop:24, display:'flex', gap:5, alignItems:'center', color:C.faint, fontSize:'.78rem' }}>
                {[0,.3,.6].map(d=><span key={d} style={{ animation:`pulse 1s ${d}s infinite` }}>●</span>)}
                <span style={{ marginLeft:6 }}>Processing on Base</span>
              </div>
              <div style={{ marginTop:24, display:'flex', gap:6, flexWrap:'wrap' }}>
                {RESULTS.map((res,i) => (
                  <button key={i} onClick={() => setStep(i)}
                    style={{ padding:'5px 12px', borderRadius:4, fontSize:'.72rem', fontWeight:700,
                      border:`1px solid ${i===step ? C.green : C.border}`,
                      background: i===step ? 'rgba(110,224,74,.1)' : 'transparent',
                      color: i===step ? C.green : C.faint,
                      cursor:'pointer', fontFamily:'monospace', transition:'all .2s' }}>
                    {res.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right */}
            <div style={{ padding:28, background:C.bg2 }} key={step}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                <span style={{ fontSize:'.68rem', fontWeight:700, color:C.faint,
                  textTransform:'uppercase', letterSpacing:'.1em' }}>Result</span>
                <span style={{ padding:'4px 12px', borderRadius:4, background:r.color+'18',
                  border:`1px solid ${r.color}44`, color:r.color, fontWeight:700, fontSize:'.78rem',
                  fontFamily:'Arial, sans-serif' }}>
                  {r.badge==='SAFE'?'✅':r.badge==='CAUTION'?'⚠️':'🚨'} {r.badge}
                </span>
              </div>

              <div style={{ textAlign:'center', marginBottom:20 }}>
                <svg viewBox="0 0 110 110" width={100} height={100} style={{ transform:'rotate(-90deg)' }}>
                  <circle cx="55" cy="55" r="46" fill="none" stroke={C.border} strokeWidth="7"/>
                  <circle cx="55" cy="55" r="46" fill="none" stroke={r.color} strokeWidth="7"
                    strokeLinecap="round" strokeDasharray={`${(r.score/100)*circ} ${circ}`}
                    style={{ transition:'stroke-dasharray 1s ease' }}/>
                </svg>
                <div style={{ marginTop:-68, marginBottom:52 }}>
                  <div style={{ fontSize:'1.8rem', fontWeight:800, color:r.color, fontFamily:'Arial, sans-serif' }}>{r.score}</div>
                  <div style={{ fontSize:'.68rem', color:C.faint }}>/ 100 risk</div>
                </div>
              </div>

              {findings.map((f,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10,
                  fontSize:'.8rem', color:C.muted, marginBottom:9, fontFamily:'Times New Roman, serif' }}>
                  <div style={{ width:18, height:18, borderRadius:'50%', flexShrink:0,
                    background:r.score<30?'rgba(110,224,74,.15)':'rgba(239,68,68,.15)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'.6rem', color:r.score<30?C.green:'#ef4444' }}>
                    {r.score<30?'✓':'✗'}
                  </div>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating */}
        <div className="float" style={{ position:'absolute', top:-16, right:-20, zIndex:10,
          background:C.card, borderRadius:10, padding:'10px 16px',
          boxShadow:C.shadowM, border:`1px solid ${C.border}`, fontSize:'.78rem' }}>
          <div style={{ fontSize:'.65rem', color:C.faint, marginBottom:2, fontFamily:'Arial,sans-serif' }}>Cost</div>
          <div style={{ color:C.green, fontWeight:800, fontFamily:'Arial,sans-serif' }}>$0.01 USDC</div>
        </div>
        <div className="float2" style={{ position:'absolute', bottom:-12, left:-20, zIndex:10,
          background:C.card, borderRadius:10, padding:'10px 16px',
          boxShadow:C.shadowM, border:`1px solid ${C.border}`, fontSize:'.78rem' }}>
          <div style={{ fontSize:'.65rem', color:C.faint, marginBottom:2, fontFamily:'Arial,sans-serif' }}>Network</div>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontWeight:700, color:C.white, fontFamily:'Arial,sans-serif' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#0052ff" opacity=".3"/>
              <circle cx="12" cy="12" r="6" fill="#0052ff"/>
            </svg>
            Base Mainnet
          </div>
        </div>
      </div>
    </div>
  )
}
