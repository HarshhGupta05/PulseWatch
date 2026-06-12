// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'
// import DashboardPage from './pages/DashboardPage'
// import MonitorDetailPage from './pages/MonitorDetailPage'

// import HomePage from './pages/HomePage'
// import AboutPage from './pages/AboutPage'

// import { useAuth } from './context/AuthContext'

// const ProtectedRoute = ({ children }) => {
//   const { token } = useAuth()
//   // if no token, kick to login — the user never sees the page
//   return token ? children : <Navigate to="/login" replace />
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage/>} />
//         <Route path="/about" element={<AboutPage/>} />
//         <Route path="/login"    element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/dashboard" element={
//           <ProtectedRoute><DashboardPage /></ProtectedRoute>
//         }/>
//         <Route path="/monitor/:id" element={
//           <ProtectedRoute><MonitorDetailPage /></ProtectedRoute>
//         }/>
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }


// src/App.jsx -- Testing home and about routes only
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}