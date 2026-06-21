import { useEffect, useRef, useState } from 'react'
import { C } from '../tokens'
import CrooLogo from './CrooLogo'
import ProductShowcase from './ProductShowcase'

/* ── Terminal typewriter ── */
const LINES = [
  { t: 'cmd',    text: '$ attestr check_contract_risk 0x833589f...' },
  { t: 'info',   text: '  ◐ Connecting to Base mainnet...' },
  { t: 'info',   text: '  ◐ Fetching contract on-chain...' },
  { t: 'info',   text: '  ◐ Running 8 security checks...' },
  { t: 'blank',  text: '' },
  { t: 'open',   text: '{' },
  { t: 'field',  text: '  "verdict":    ', val: '"SAFE"',    valColor: '#6EE04A' },
  { t: 'field',  text: '  "risk_score": ', val: '10',         valColor: '#6EE04A' },
  { t: 'field',  text: '  "token":      ', val: '"USDC"',     valColor: '#f59e0b' },
  { t: 'field',  text: '  "network":    ', val: '"base"',     valColor: '#60a5fa' },
  { t: 'field',  text: '  "cost":       ', val: '"$0.01 USDC"', valColor: '#a78bfa' },
  { t: 'close',  text: '}' },
  { t: 'blank',  text: '' },
  { t: 'ok',     text: '  ✓ Delivered · Settled on-chain' },
]

const DELAYS = [0, 600, 1100, 1600, 2100, 2200, 2400, 2600, 2800, 3000, 3200, 3500, 3700, 4000]

function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let current = 0
    function showNext() {
      if (current >= LINES.length) return
      setVisibleCount(++current)
      if (current < LINES.length) {
        const gap = (DELAYS[current] ?? DELAYS[current - 1] + 200) - (DELAYS[current - 1] ?? 0)
        setTimeout(showNext, Math.max(gap, 120))
      }
    }
    const t = setTimeout(showNext, 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      background: '#080808', border: `1px solid ${C.border}`,
      borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,.95), 0 0 0 1px rgba(255,255,255,.04)',
      fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: '.8rem', lineHeight: 1.7,
    }}>
      {/* Window bar */}
      <div style={{ padding: '11px 16px', borderBottom: `1px solid ${C.borderL}`,
        display: 'flex', alignItems: 'center', gap: 8, background: '#0f0f0f' }}>
        {['#ff5f56','#ffbd2e','#27c93f'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }}/>
        ))}
        <span style={{ marginLeft: 8, fontSize: '.7rem', color: C.faint,
          letterSpacing: '.04em' }}>attestr — risk analysis</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.green,
            boxShadow: '0 0 6px rgba(110,224,74,.6)' }}/>
          <span style={{ fontSize: '.65rem', color: C.green }}>live</span>
        </div>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px 22px', minHeight: 320 }}>
        {LINES.slice(0, visibleCount).map((line, i) => {
          if (line.t === 'blank') return <div key={i} style={{ height: 12 }}/>
          if (line.t === 'field') return (
            <div key={i} style={{ color: '#888' }}>
              <span>{line.text}</span>
              <span style={{ color: line.valColor, fontWeight: 700 }}>{line.val}</span>
              {i < LINES.length - 3 && <span style={{ color: '#555' }}>,</span>}
            </div>
          )
          return (
            <div key={i} style={{ color:
              line.t === 'cmd'   ? '#e5e5e5' :
              line.t === 'info'  ? '#555'    :
              line.t === 'ok'    ? C.green   :
              line.t === 'open'  ? '#e5e5e5' :
              line.t === 'close' ? '#e5e5e5' : '#e5e5e5' }}>
              {line.text}
            </div>
          )
        })}
        {/* Cursor blink */}
        {visibleCount < LINES.length && (
          <span style={{ display: 'inline-block', width: 7, height: 14,
            background: C.green, marginLeft: 1, verticalAlign: 'middle',
            animation: 'pulse 1s ease-in-out infinite' }}/>
        )}
      </div>

      {/* Cost footer */}
      {visibleCount >= LINES.length && (
        <div style={{ padding: '10px 22px', borderTop: `1px solid ${C.borderL}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#0a0a0a' }}>
          <span style={{ fontSize: '.7rem', color: '#555' }}>Base mainnet · USDC</span>
          <span style={{ fontSize: '.7rem', fontWeight: 700, color: C.green }}>
            ✓ $0.01 USDC settled
          </span>
        </div>
      )}
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{ paddingTop: 80, background: '#000', position: 'relative', overflow: 'hidden' }}>
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(110,224,74,.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(110,224,74,.03) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 100% 70% at 40% 0%, black 40%, transparent 100%)',
      }}/>
      {/* Glow */}
      <div style={{ position: 'absolute', top: -80, left: '5%', width: 500, height: 500,
        borderRadius: '50%', zIndex: 0,
        background: 'radial-gradient(circle, rgba(110,224,74,.06) 0%, transparent 65%)' }}/>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 28px 80px',
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

        {/* ── Left: copy ── */}
        <div>
          {/* Sponsor pill */}
          <a href="https://croo.network" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '5px 14px 5px 6px', marginBottom: 32,
              background: 'rgba(110,224,74,.07)', border: `1px solid rgba(110,224,74,.2)`,
              borderRadius: 999, textDecoration: 'none', transition: 'border-color .2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(110,224,74,.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(110,224,74,.2)'}>
            <CrooLogo square size={20} />
            <span style={{ fontSize: '.73rem', color: C.green, fontWeight: 700,
              fontFamily: 'Arial, sans-serif', letterSpacing: '.04em' }}>
              Sponsored by CROO Network
            </span>
          </a>

          <h1 style={{
            fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: '-.04em',
            color: C.white,
            fontFamily: 'Times New Roman, serif',
            marginBottom: 22,
          }}>
            Web3 Intelligence<br/>
            <span style={{ color: C.green }}>on-chain,</span><br/>
            on demand.
          </h1>

          <p style={{
            fontSize: '1.05rem', color: C.muted,
            lineHeight: 1.8, maxWidth: 440, marginBottom: 36,
            fontFamily: 'Times New Roman, serif',
          }}>
            Contract risk checks, vault analysis, and DeFi research — AI agents on Base mainnet, paid per-use in USDC. No subscription. No setup.
          </p>

          {/* Badges row */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
            {[
              { label: 'Base Mainnet', color: '#0052ff' },
              { label: 'USDC Settlement', color: C.green },
              { label: 'CAP · MCP', color: '#a78bfa' },
            ].map(b => (
              <div key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 999,
                background: b.color + '12', border: `1px solid ${b.color}30` }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: b.color,
                  display: 'inline-block' }}/>
                <span style={{ fontSize: '.73rem', fontWeight: 700, color: b.color,
                  fontFamily: 'Arial, sans-serif' }}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="https://agent.croo.network/agents/20ba0841-8411-4ee7-960e-5b1d376943d3"
              target="_blank" rel="noreferrer"
              style={{ padding: '13px 28px', background: C.green, color: '#000',
                fontWeight: 800, fontSize: '.95rem', borderRadius: 6, textDecoration: 'none',
                fontFamily: 'Arial, sans-serif', transition: 'opacity .2s, transform .2s',
                boxShadow: '0 0 32px rgba(110,224,74,.2)' }}
              onMouseEnter={e => { e.currentTarget.style.opacity='.88'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='' }}>
              Hire the Agent →
            </a>
            <a href="#protocols"
              style={{ padding: '13px 24px', background: 'transparent', color: C.white,
                fontWeight: 600, fontSize: '.95rem', borderRadius: 6, textDecoration: 'none',
                fontFamily: 'Arial, sans-serif', border: `1px solid ${C.border}`,
                transition: 'border-color .2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              How it works
            </a>
          </div>
        </div>

        {/* ── Right: terminal ── */}
        <div>
          <Terminal />
        </div>
      </div>

      <ProductShowcase />
    </section>
  )
}
