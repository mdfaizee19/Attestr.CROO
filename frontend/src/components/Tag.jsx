import { C } from '../tokens'

export default function Tag({ children, color }) {
  const col = color || C.green
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '4px 14px',
      background: col + '18',
      border: `1px solid ${col}44`,
      borderRadius: 4,
      fontSize: '.72rem', fontWeight: 700,
      color: col,
      letterSpacing: '.1em', textTransform: 'uppercase',
      marginBottom: 16,
      fontFamily: 'Arial, sans-serif',
    }}>
      {children}
    </div>
  )
}
