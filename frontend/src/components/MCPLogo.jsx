export default function MCPLogo({ size = 48, color = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/*
        MCP logo: a continuous thick rounded-stroke ribbon that forms
        two stacked loops — like a stylised ∞ / folded USB ribbon shape.
        Traced from the official MCP brand mark.
      */}
      <path
        d={`
          M 155 158
          L 155 120
          Q 155 68  110 68
          Q  65 68   65 112
          Q  65 140   90 148
          Q 108 154  120 140
          Q 138 120  110 108
          Q  88  98   88 118
          Q  88 138  110 140
        `}
        stroke={color}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
