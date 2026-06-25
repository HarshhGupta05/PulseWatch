import { Link } from 'react-router-dom'

export default function MonitorCard({ monitor }) {
  const hasStatus = monitor.lastStatus !== undefined
  const isUp = monitor.lastStatus === true

  return (
    <Link to={`/monitor/${monitor._id}`}
      className="block p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900 truncate">{monitor.name}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          !hasStatus ? 'bg-gray-100 text-gray-600' : isUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {!hasStatus ? 'PENDING' : isUp ? 'UP' : 'DOWN'}
        </span>
      </div>
      <p className="text-xs text-gray-400 truncate">{monitor.url}</p>
      {monitor.lastResponseTime && (
        <p className="text-xs text-gray-400 mt-2">{monitor.lastResponseTime}ms</p>
      )}
    </Link>
  )
}
