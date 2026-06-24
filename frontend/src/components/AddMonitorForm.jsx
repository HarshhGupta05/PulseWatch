import { useState } from 'react'
import axiosInstance from '../api/axios'

export default function AddMonitorForm({ onAdded }) {
  const [form, setForm]       = useState({ name: '', url: '', alertEmail: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axiosInstance.post('/api/monitors', form)
      onAdded(data)   // lift state up — tell parent about the new monitor
      setForm({ name: '', url: '', alertEmail: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add monitor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded-xl">
      <input placeholder="Name" value={form.name}
        onChange={e => setForm(f => ({...f, name: e.target.value}))}
        className="border rounded-lg px-3 py-2 text-sm" required />
      <input placeholder="https://..." value={form.url}
        onChange={e => setForm(f => ({...f, url: e.target.value}))}
        className="border rounded-lg px-3 py-2 text-sm" required />
      <input placeholder="Alert email (optional)" value={form.alertEmail}
        onChange={e => setForm(f => ({...f, alertEmail: e.target.value}))}
        className="border rounded-lg px-3 py-2 text-sm" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button disabled={loading} className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium">
        {loading ? 'Adding...' : 'Add monitor'}
      </button>
    </form>
  )
}