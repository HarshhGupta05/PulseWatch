import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'  // npm install date-fns

export default function UptimeChart({ logs }) {
  // Transform PingLog documents into the shape Recharts expects
  const data = logs.map(log => ({
    time: format(new Date(log.createdAt), 'HH:mm'),
    ms: log.responseTime,
    status: log.isUp ? 'up' : 'down',
  }))

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="time" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} unit="ms" />
        <Tooltip
          formatter={(value) => [`${value}ms`, 'Response time']}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Line
          type="monotone"
          dataKey="ms"
          stroke="#111827"
          strokeWidth={1.5}
          dot={false}          // no dots — cleaner for dense time-series data
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}