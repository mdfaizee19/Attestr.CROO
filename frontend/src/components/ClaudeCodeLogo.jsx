/* Pixel-art block style matching the Claude Code brand image */
const PIXEL = 10
const GAP   = 2
const STEP  = PIXEL + GAP

function PixelChar({ grid, xOff, yOff, color = '#D97757' }) {
  return grid.flatMap((row, r) =>
    row.split('').map((cell, c) =>
      cell === '1' ? (
        <rect key={`${r}-${c}`}
          x={xOff + c * STEP} y={yOff + r * STEP}
          width={PIXEL} height={PIXEL}
          rx={1} fill={color}/>
      ) : null
    )
  )
}

const CHARS = {
  C: ['01110','10000','10000','10000','01110'],
  L: ['10000','10000','10000','10000','11111'],
  A: ['01110','10001','11111','10001','10001'],
  U: ['10001','10001','10001','10001','01110'],
  D: ['11100','10010','10001','10010','11100'],
  E: ['11111','10000','11110','10000','11111'],
  O: ['01110','10001','10001','10001','01110'],
}

const LINE1 = ['C','L','A','U','D','E']
const LINE2 = ['C','O','D','E']

export default function ClaudeCodeLogo({ size = 200 }) {
  const W = 6 * (5 * STEP) + 5 * 6  // line 1 width approx
  const viewW = 380
  const viewH = 130
  const scale = size / viewW

  return (
    <svg width={size} height={Math.round(viewH * scale)} viewBox={`0 0 ${viewW} ${viewH}`} fill="none">
      <rect width={viewW} height={viewH} fill="#111"/>
      {LINE1.map((ch, i) => (
        <PixelChar key={`l1-${i}`} grid={CHARS[ch]} xOff={8 + i * (5 * STEP + 4)} yOff={8}/>
      ))}
      {LINE2.map((ch, i) => (
        <PixelChar key={`l2-${i}`} grid={CHARS[ch]} xOff={8 + i * (5 * STEP + 4)} yOff={76}/>
      ))}
    </svg>
  )
}
