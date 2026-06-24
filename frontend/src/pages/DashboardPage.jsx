export default function DashboardPage() {
  const { monitors, loading, error, setMonitors } = useFetchMonitors()

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>
  if (error)   return <div className="p-8 text-red-500">{error}</div>

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {monitors.map(monitor => (
        <MonitorCard key={monitor._id} monitor={monitor} />
      ))}
    </div>
  )
}