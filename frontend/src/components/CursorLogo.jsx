export default function CursorLogo({ size = 160 }) {
  const h = Math.round(size * 0.42)
  return (
    <svg width={size} height={h} viewBox="0 0 380 160" fill="none">
      {/* 3D cube — top face */}
      <polygon points="50,20 90,40 50,60 10,40" fill="#e8e8e8"/>
      {/* left face */}
      <polygon points="10,40 50,60 50,100 10,80" fill="#888888"/>
      {/* right face */}
      <polygon points="90,40 50,60 50,100 90,80" fill="#bbbbbb"/>
      {/* inner top highlight */}
      <polygon points="50,28 80,42 50,56 20,42" fill="#f4f4f4" opacity="0.6"/>
      {/* CURSOR text */}
      <text x="108" y="97" fontFamily="Arial, Helvetica, sans-serif"
        fontSize="60" fill="#ffffff" fontWeight="700" letterSpacing="2">CURSOR</text>
    </svg>
  )
}
