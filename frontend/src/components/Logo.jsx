export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aGrad" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8"/>
          <stop offset="60%" stopColor="#0ea5e9"/>
          <stop offset="100%" stopColor="#0047b3"/>
        </linearGradient>
      </defs>
      {/* Outer A shape — wide legs */}
      <path d="M50 4 L96 96 H73 L50 36 L27 96 H4 Z" fill="url(#aGrad)"/>
      {/* White downward arrow in crossbar region */}
      <path d="M43 52 L43 38 L57 38 L57 52 L65 52 L50 72 L35 52 Z" fill="white"/>
    </svg>
  )
}
