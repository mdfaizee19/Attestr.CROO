import { Link } from 'react-router-dom'
import { C } from '../tokens'

const PANELS = [
  {
    to: '/docs/traders',
    color: C.green,
    role: 'For Traders',
    heading: 'Research safely.\nTrade confidently.',
    sub: 'Step-by-step guides for Hyperliquid vaults, contract risk scores, and DeFi research queries. No technical background required.',
    tools: ['Vault Analysis', 'Contract Risk', 'Web3 Research', 'Full Due Diligence'],
    cta: 'Open Trader Docs',
    icon: '📈',
    lightBg: true,
  },
  {
    to: '/docs/developers',
    color: '#ffffff',
    role: 'For Builders',
    heading: 'Integrate in\nminutes.',
    sub: 'MCP server setup for Claude, Claude Code, and Cursor. CAP lifecycle, tool schemas, architecture, and environment variables.',
    tools: ['MCP Server', 'CAP Protocol', 'Tool Schemas', 'Architecture'],
    cta: 'Open Developer Docs',
    icon: '⚙️',
    lightBg: false,
  },
]

export default function DocsBanner() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderTop: `1px solid ${C.border}` }}>
      {PANELS.map((p, i) => (
        <Link key={p.to} to={p.to} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            padding: '72px 56px',
            background: p.lightBg ? 'rgba(110,224,74,.03)' : '#000',
            borderRight: i === 0 ? `1px solid ${C.border}` : 'none',
            minHeight: 440,
            position: 'relative', overflow: 'hidden',
            transition: 'background .25s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = p.lightBg
              ? 'rgba(110,224,74,.07)' : 'rgba(255,255,255,.02)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = p.lightBg
              ? 'rgba(110,224,74,.03)' : '#000'
          }}>
            {/* Large background icon */}
            <div style={{ position: 'absolute', right: 40, top: 40, fontSize: '6rem',
              opacity: .06, userSelect: 'none', pointerEvents: 'none' }}>{p.icon}</div>

            {/* Role pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', marginBottom: 28,
              background: p.color + '14', border: `1px solid ${p.color}30`,
              borderRadius: 999 }}>
              <span style={{ fontSize: '.72rem', fontWeight: 800, color: p.color,
                letterSpacing: '.1em', textTransform: 'uppercase',
                fontFamily: 'Arial, sans-serif' }}>{p.role}</span>
            </div>

            {/* Heading — whitespace: pre handles the \n */}
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: '-.04em',
              color: C.white,
              fontFamily: 'Times New Roman, serif',
              marginBottom: 20,
              whiteSpace: 'pre-line',
            }}>{p.heading}</h2>

            <p style={{ fontSize: '.9rem', color: C.muted, lineHeight: 1.75,
              fontFamily: 'Times New Roman, serif', maxWidth: 360, marginBottom: 36 }}>
              {p.sub}
            </p>

            {/* Tool chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {p.tools.map(t => (
                <span key={t} style={{ padding: '4px 10px', borderRadius: 4,
                  fontSize: '.7rem', fontWeight: 700,
                  background: p.color + '10', color: p.color,
                  border: `1px solid ${p.color}22`,
                  fontFamily: 'Arial, sans-serif' }}>{t}</span>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '11px 22px',
              background: p.color, color: p.lightBg ? '#000' : '#000',
              borderRadius: 6, fontWeight: 800, fontSize: '.9rem',
              fontFamily: 'Arial, sans-serif', transition: 'opacity .2s' }}>
              {p.cta} →
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}
