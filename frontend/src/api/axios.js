const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const request = async (path, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${baseURL}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed')
    error.response = { data, status: response.status }
    throw error
  }

  return { data }
}

const axiosInstance = {
  get: (path) => request(path),
  post: (path, body) => request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

export default axiosInstance
