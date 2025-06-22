import { useState } from 'react'
import Login from './components/Login'
import EmployeeDashboard from './components/EmployeeDashboard'
// import './App.css'

function isAuthenticated() {
  return !!localStorage.getItem('token')
}

function App() {
  const [auth, setAuth] = useState(isAuthenticated())

  const handleLogin = () => setAuth(true)
  const handleLogout = () => setAuth(false)

  return auth ? (
    <EmployeeDashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  )
}

export default App
