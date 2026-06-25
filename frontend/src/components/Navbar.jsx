import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="font-semibold text-gray-900">PulseWatch</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/about" className="text-gray-500 hover:text-gray-900">About</Link>
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
