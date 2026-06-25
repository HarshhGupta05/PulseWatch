import { useEffect, useState } from 'react'
import axiosInstance from '../api/axios.js'
import AddMonitorForm from '../components/AddMonitorForm.jsx'
import MonitorCard from '../components/MonitorCard.jsx'
import Navbar from '../components/Navbar.jsx'

export default function DashboardPage() {
  const [monitors, setMonitors] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    const loadMonitors = async () => {
      try {
        const { data } = await axiosInstance.get('/api/monitors')
        setMonitors(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load monitors')
      } finally {
        setLoading(false)
      }
    }

    loadMonitors()
  }, [])

  const handleAdded = (monitor) => {
    setMonitors(current => [monitor, ...current])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6 grid gap-6">
        <AddMonitorForm onAdded={handleAdded} />

        {loading && <div className="text-gray-500">Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monitors.map(monitor => (
              <MonitorCard key={monitor._id} monitor={monitor} />
            ))}
            {monitors.length === 0 && (
              <p className="text-sm text-gray-400">No monitors yet.</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
