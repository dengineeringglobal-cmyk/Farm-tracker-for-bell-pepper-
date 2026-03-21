interface StatCardProps {
  label: string
  value: number
  highlight?: 'success' | 'warning' | 'danger'
}

export default function StatCard({ label, value, highlight }: StatCardProps) {
  const highlightClass = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }[highlight || 'success']

  return (
    <div className="card">
      <p className="stat-label">{label}</p>
      <p className={`stat-value ${highlightClass}`}>{value}</p>
    </div>
  )
}
