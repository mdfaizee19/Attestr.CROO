export default function HyperliquidLogo({ size = 120 }) {
  const h = Math.round(size * 0.45)
  return (
    <svg width={size} height={h} viewBox="0 0 300 135" fill="none">
      {/* Fluid H shape in mint/teal */}
      <path d="M30 30 Q30 10 50 10 Q70 10 70 30 L70 55 Q70 68 85 68 Q100 68 100 55 L100 30 Q100 10 120 10 Q140 10 140 30 L140 105 Q140 125 120 125 Q100 125 100 105 L100 80 Q100 67 85 67 Q70 67 70 80 L70 105 Q70 125 50 125 Q30 125 30 105 Z" fill="#4EEFD4"/>
      {/* Hyper text */}
      <text x="158" y="58" fontFamily="Georgia, Times New Roman, serif"
        fontSize="38" fill="#ffffff" fontWeight="400" letterSpacing="-0.5">Hyper</text>
      {/* liquid in teal italic */}
      <text x="158" y="100" fontFamily="Georgia, Times New Roman, serif"
        fontSize="38" fill="#4EEFD4" fontStyle="italic" fontWeight="400">liquid</text>
    </svg>
  )
}
