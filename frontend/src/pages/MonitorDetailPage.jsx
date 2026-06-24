// src/pages/MonitorDetailPage.jsx
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/axios'
import UptimeChart from '../components/UptimeChart'
import Navbar from '../components/Navbar'

export default function MonitorDetailPage() {
  const { id } = useParams()
  const [monitor, setMonitor] = useState(null)
  const [logs, setLogs]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [monRes, logRes] = await Promise.all([
          axiosInstance.get(`/api/monitors/${id}`),
          axiosInstance.get(`/api/pinglogs/${id}?limit=60`),
        ])
        setMonitor(monRes.data)
        setLogs(logRes.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="p-8">Loading...</div>
  if (!monitor) return <div className="p-8 text-red-500">Monitor not found</div>

  const upCount   = logs.filter(l => l.isUp).length
  const uptimePct = logs.length ? Math.round((upCount / logs.length) * 100) : 0
  const avgMs     = logs.length ? Math.round(logs.reduce((s,l) => s + l.responseTime, 0) / logs.length) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-xl font-semibold mb-1">{monitor.name}</h1>
        <p className="text-sm text-gray-400 mb-6">{monitor.url}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Stat label="Uptime"        value={`${uptimePct}%`} />
          <Stat label="Avg response"  value={`${avgMs}ms`} />
          <Stat label="Checks"        value={logs.length} />
        </div>
        <UptimeChart logs={logs} />
      </div>
    </div>
  )
}

const Stat = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
)