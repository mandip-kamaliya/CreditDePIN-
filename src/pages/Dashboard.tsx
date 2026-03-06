import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  TrendingUp, 
  Database, 
  Users, 
  ExternalLink, 
  Eye, 
  Settings,
  ArrowUp
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'

const earningsData = [
  { day: 'Mon', earnings: 120 },
  { day: 'Tue', earnings: 180 },
  { day: 'Wed', earnings: 240 },
  { day: 'Thu', earnings: 200 },
  { day: 'Fri', earnings: 320 },
  { day: 'Sat', earnings: 280 },
  { day: 'Sun', earnings: 340 },
  { day: 'Mon', earnings: 380 },
  { day: 'Tue', earnings: 420 },
  { day: 'Wed', earnings: 460 },
  { day: 'Thu', earnings: 440 },
  { day: 'Fri', earnings: 520 },
  { day: 'Sat', earnings: 480 },
  { day: 'Sun', earnings: 580 },
]

const dataPointsData = [
  { day: 'Mon', points: 1200 },
  { day: 'Tue', points: 1440 },
  { day: 'Wed', points: 1680 },
  { day: 'Thu', points: 1320 },
  { day: 'Fri', points: 1920 },
  { day: 'Sat', points: 1560 },
  { day: 'Sun', points: 1840 },
  { day: 'Mon', points: 2080 },
  { day: 'Tue', points: 2320 },
  { day: 'Wed', points: 2560 },
  { day: 'Thu', points: 2240 },
  { day: 'Fri', points: 2880 },
  { day: 'Sat', points: 2520 },
  { day: 'Sun', points: 3040 },
]

const devices = [
  {
    id: 1,
    name: 'Mumbai Weather Station',
    type: 'Weather',
    status: 'Online',
    statusColor: 'green',
    dataPoints24h: 1440,
    subscribers: 3,
    ctcEarned: 240,
    integrityScore: 99.8
  },
  {
    id: 2,
    name: 'Solar Panel Monitor',
    type: 'Energy',
    status: 'Online',
    statusColor: 'green',
    dataPoints24h: 288,
    subscribers: 2,
    ctcEarned: 180,
    integrityScore: 98.2
  },
  {
    id: 3,
    name: 'Rooftop Air Quality',
    type: 'Air Quality',
    status: 'Offline',
    statusColor: 'red',
    dataPoints24h: 0,
    subscribers: 2,
    ctcEarned: 0,
    integrityScore: 94.1
  }
]

const onChainActivity = [
  { 
    description: 'Data batch verified — 144 points', 
    address: '0xabc...def', 
    time: '2 min ago',
    hash: '0xabc123def456'
  },
  { 
    description: 'Subscriber payment received — 50 CTC', 
    address: 'from 0x789...012', 
    time: '1 hr ago',
    hash: '0x789012def345'
  },
  { 
    description: 'Rewards claimed — 240 CTC', 
    address: '0xdef...123', 
    time: '3 hrs ago',
    hash: '0xdef123456789'
  },
  { 
    description: 'New device registered', 
    address: '0x456...789', 
    time: '5 hrs ago',
    hash: '0x456789abc012'
  },
  { 
    description: 'Data batch verified — 288 points', 
    address: '0x012...345', 
    time: '8 hrs ago',
    hash: '0x0123456789ab'
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      
      <div className="pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <Link 
              to="/register"
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Register New Device →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex items-center text-green-400 text-sm">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +1
                </div>
              </div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-gray-400 text-sm">Active Devices</div>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">4,820 CTC</div>
              <div className="text-gray-400 text-sm">Total CTC Earned</div>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">124,440</div>
              <div className="text-gray-400 text-sm">Data Points Logged</div>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">7</div>
              <div className="text-gray-400 text-sm">Active Subscribers</div>
            </motion.div>
          </div>

          {/* Devices Table */}
          <motion.div
            className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-6">Your Devices</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Device Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Data Points (24h)</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Subscribers</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">CTC Earned (month)</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Integrity Score</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b border-white/5">
                      <td className="py-3 px-4 text-white">{device.name}</td>
                      <td className="py-3 px-4 text-gray-300">{device.type}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          device.statusColor === 'green' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {device.status === 'Online' ? '🟢' : '🔴'} {device.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{device.dataPoints24h.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-300">{device.subscribers} subs</td>
                      <td className="py-3 px-4 text-gray-300">{device.ctcEarned} CTC</td>
                      <td className="py-3 px-4">
                        <span className={`text-sm ${
                          device.integrityScore >= 99 ? 'text-green-400' : 
                          device.integrityScore >= 95 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {device.integrityScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-purple-400 hover:text-purple-300 transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-6">CTC Earnings Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    dot={{ fill: '#7c3aed' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-xl font-bold mb-6">Data Points Logged Per Day</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dataPointsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="points" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent On-Chain Activity */}
          <motion.div
            className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-xl font-bold mb-6">Recent On-Chain Activity</h2>
            <div className="space-y-4">
              {onChainActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white">{activity.description}</div>
                    <div className="text-gray-400 text-sm">{activity.address} — {activity.time}</div>
                  </div>
                  <a
                    href={`https://creditcoin-testnet.blockscout.com/tx/${activity.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
