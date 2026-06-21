export default function CrooLogo({ size = 48, square = false }) {
  if (square) {
    const h = size
    return (
      <svg width={h} height={h} viewBox="0 0 200 200" fill="none">
        <rect width="200" height="200" fill="#6EE04A"/>
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
          fontFamily="Arial Black, Helvetica Neue, sans-serif"
          fontWeight="900" fontSize="68" fill="#000" letterSpacing="-1">CROO</text>
      </svg>
    )
  }
  const h = Math.round(size * 0.38)
  return (
    <svg width={size} height={h} viewBox="0 0 400 150" fill="none">
      <rect width="400" height="150" rx="0" fill="#6EE04A"/>
      <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle"
        fontFamily="Arial Black, Helvetica Neue, sans-serif"
        fontWeight="900" fontSize="100" fill="#000" letterSpacing="-2">CROO</text>
    </svg>
  )
}
