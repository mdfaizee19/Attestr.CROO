export default function Logo({ size = 36 }) {
  return (
    <img src="/logo.png" width={size} height={size} alt="Attestr" style={{ borderRadius: size * 0.22 }} />
  )
}
