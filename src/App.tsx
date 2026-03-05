import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Marketplace from './pages/Marketplace'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}

export default App
