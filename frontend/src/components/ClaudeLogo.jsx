export default function ClaudeLogo({ size = 120 }) {
  const h = Math.round(size * 0.42)
  return (
    <svg width={size} height={h} viewBox="0 0 300 126" fill="none">
      {/* Orange asterisk starburst */}
      <g transform="translate(40,63)">
        {[0,30,60,90,120,150].map(deg => {
          const r = deg * Math.PI / 180
          const x2 = Math.cos(r) * 32
          const y2 = Math.sin(r) * 32
          return (
            <line key={deg} x1={-Math.cos(r)*32} y1={-Math.sin(r)*32}
              x2={x2} y2={y2}
              stroke="#D97757" strokeWidth="9" strokeLinecap="round"/>
          )
        })}
      </g>
      {/* Claude text */}
      <text x="88" y="79" fontFamily="Georgia, Times New Roman, serif"
        fontSize="58" fill="#ffffff" fontWeight="400" letterSpacing="-1">Claude</text>
    </svg>
  )
}
