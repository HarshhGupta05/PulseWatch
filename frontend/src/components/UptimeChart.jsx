export default function UptimeChart({ logs }) {
  const width = 640
  const height = 240
  const padding = 28
  const maxMs = Math.max(...logs.map(log => log.responseTime || 0), 100)

  const points = logs.map((log, index) => {
    const x = logs.length === 1
      ? width / 2
      : padding + (index / (logs.length - 1)) * (width - padding * 2)
    const y = height - padding - ((log.responseTime || 0) / maxMs) * (height - padding * 2)
    return { x, y, log }
  })

  if (logs.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-sm text-gray-400">
        No ping logs yet.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-60">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" />
        <polyline
          fill="none"
          stroke="#111827"
          strokeWidth="2"
          points={points.map(point => `${point.x},${point.y}`).join(' ')}
        />
        {points.map(({ x, y, log }) => (
          <circle
            key={log._id}
            cx={x}
            cy={y}
            r="4"
            fill={log.isUp ? '#16a34a' : '#dc2626'}
          />
        ))}
        <text x={padding} y="18" fontSize="12" fill="#6b7280">
          Response time, max {maxMs}ms
        </text>
      </svg>
    </div>
  )
}
