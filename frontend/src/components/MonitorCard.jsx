import { Link } from 'react-router-dom'

export default function MonitorCard({ monitor }) {
  const isUp = monitor.lastStatus ?? true  // default optimistic
  return (
    <Link to={`/monitor/${monitor._id}`}
      className="block p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900 truncate">{monitor.name}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isUp ? 'UP' : 'DOWN'}
        </span>
      </div>
      <p className="text-xs text-gray-400 truncate">{monitor.url}</p>
    </Link>
  )
}