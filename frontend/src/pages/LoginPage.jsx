// frontend/src/pages/LoginPage.jsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  // These hold what the user types into the form fields
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  // loading = true while the API call is in flight (disables the button)
  const [loading, setLoading]   = useState(false)

  // error holds a message to show the user if login fails
  const [error, setError]       = useState(null)

  // login() saves the token to localStorage and React state
  const { login } = useAuth()

  // navigate() redirects the user to a different page
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    // Prevents the browser from reloading the page on form submit
    e.preventDefault()
    setLoading(true)
    setError(null)   // clear any previous error

    try {
      const { data } = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      })

      // data.token is the JWT returned by the backend
      // login() stores it so the rest of the app knows the user is authenticated
      login(data.token)

      // Send the user to the dashboard after successful login
      navigate('/dashboard')
    } catch (err) {
      // err.response?.data?.message is the error message from your Express controller
      // The ?. means "if err.response exists AND err.response.data exists"
      setError(err.response?.data?.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm">

        {/* App name at the top */}
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Uptime Monitor</h1>
        <p className="text-sm text-gray-400 mb-6">Sign in to your account</p>

        {/* Error message — only shows when error state is not null */}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          {/* disabled while loading so the user can't click twice */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Link to register page — uses React Router, no page reload */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-900 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}