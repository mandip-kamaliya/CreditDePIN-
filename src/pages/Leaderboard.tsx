import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Cloud,
  Zap,
  Car,
  Wind,
  Droplets,
  Radio,
  Activity,
  Database,
  Users,
  Coins
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import Navbar from '../components/Navbar'

interface Operator {
  rank: number
  wallet: string
  devices: number
  dataPoints: number
  integrity: number
  subscribers: number
  ctcEarned: number
  trend: 'up' | 'down' | 'neutral'
}

const weeklyData: Operator[] = [
  { rank: 1, wallet: '0x7f3a...b291', devices: 12, dataPoints: 17280, integrity: 99.8, subscribers: 45, ctcEarned: 2840, trend: 'up' },
  { rank: 2, wallet: '0x8c4d...e5f6', devices: 8, dataPoints: 11520, integrity: 98.9, subscribers: 32, ctcEarned: 2120, trend: 'up' },
  { rank: 3, wallet: '0x9a5e...f6a7', devices: 6, dataPoints: 8640, integrity: 97.5, subscribers: 28, ctcEarned: 1890, trend: 'down' },
  { rank: 4, wallet: '0x1b6f...a7b8', devices: 10, dataPoints: 14400, integrity: 99.2, subscribers: 38, ctcEarned: 1650, trend: 'up' },
  { rank: 5, wallet: '0x2c7g...b8c9', devices: 7, dataPoints: 10080, integrity: 96.8, subscribers: 25, ctcEarned: 1420, trend: 'neutral' },
  { rank: 6, wallet: '0x3d8h...c9d0', devices: 9, dataPoints: 12960, integrity: 98.1, subscribers: 30, ctcEarned: 1280, trend: 'up' },
  { rank: 7, wallet: '0x4e9i...d0e1', devices: 5, dataPoints: 7200, integrity: 95.9, subscribers: 22, ctcEarned: 1150, trend: 'down' },
  { rank: 8, wallet: '0x5f0j...e1f2', devices: 11, dataPoints: 15840, integrity: 99.5, subscribers: 41, ctcEarned: 980, trend: 'up' },
  { rank: 9, wallet: '0x6g1k...f2g3', devices: 4, dataPoints: 5760, integrity: 94.2, subscribers: 18, ctcEarned: 820, trend: 'neutral' },
  { rank: 10, wallet: '0x7h2l...g3h4', devices: 8, dataPoints: 11520, integrity: 97.8, subscribers: 29, ctcEarned: 750, trend: 'up' },
  { rank: 11, wallet: '0x8i3m...h4i5', devices: 6, dataPoints: 8640, integrity: 96.5, subscribers: 24, ctcEarned: 680, trend: 'down' },
  { rank: 12, wallet: '0x9j4n...i5j6', devices: 9, dataPoints: 12960, integrity: 98.7, subscribers: 33, ctcEarned: 620, trend: 'up' },
  { rank: 13, wallet: '0x0k5o...j6k7', devices: 3, dataPoints: 4320, integrity: 93.8, subscribers: 15, ctcEarned: 540, trend: 'neutral' },
  { rank: 14, wallet: '0x1l6p...k7l8', devices: 7, dataPoints: 10080, integrity: 97.2, subscribers: 26, ctcEarned: 480, trend: 'up' },
  { rank: 15, wallet: '0x2m7q...l8m9', devices: 5, dataPoints: 7200, integrity: 95.5, subscribers: 20, ctcEarned: 420, trend: 'down' },
  { rank: 16, wallet: '0x3n8r...m9n0', devices: 10, dataPoints: 14400, integrity: 99.0, subscribers: 37, ctcEarned: 380, trend: 'up' },
  { rank: 17, wallet: '0x4o9s...n0o1', devices: 4, dataPoints: 5760, integrity: 94.8, subscribers: 17, ctcEarned: 320, trend: 'neutral' },
  { rank: 18, wallet: '0x5p0t...o1p2', devices: 8, dataPoints: 11520, integrity: 98.3, subscribers: 31, ctcEarned: 280, trend: 'up' },
  { rank: 19, wallet: '0x6q1u...p2q3', devices: 6, dataPoints: 8640, integrity: 96.9, subscribers: 23, ctcEarned: 240, trend: 'down' },
  { rank: 20, wallet: '0x7r2v...q3r4', devices: 9, dataPoints: 12960, integrity: 98.5, subscribers: 34, ctcEarned: 200, trend: 'up' },
]

const monthlyData: Operator[] = weeklyData.map((op, index) => ({
  ...op,
  ctcEarned: op.ctcEarned * 4.3, // Monthly multiplier
  dataPoints: op.dataPoints * 30,
  trend: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'neutral'
}))

const allTimeData: Operator[] = weeklyData.map((op, index) => ({
  ...op,
  ctcEarned: op.ctcEarned * 52, // Yearly multiplier for all-time
  dataPoints: op.dataPoints * 365,
  trend: index % 2 === 0 ? 'up' : 'down'
}))

const deviceTypeData = [
  { name: 'Weather', value: 35, color: '#06b6d4' },
  { name: 'Energy', value: 25, color: '#7c3aed' },
  { name: 'Air Quality', value: 20, color: '#10b981' },
  { name: 'GPS', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#6b7280' },
]

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'allTime'>('week')
  
  const getData = () => {
    switch (activeTab) {
      case 'week': return weeklyData
      case 'month': return monthlyData
      case 'allTime': return allTimeData
      default: return weeklyData
    }
  }

  const currentData = getData()
  const top3 = currentData.slice(0, 3)
  const restOfData = currentData.slice(3)

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />
      case 'neutral': return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return rank.toString()
    }
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      
      <div className="pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">🏆 Top Operators</h1>
            <p className="text-xl text-gray-300 mb-8">
              Ranked by CTC earned and data integrity this month
            </p>
            
            {/* Tabs */}
            <div className="flex justify-center space-x-2 mb-8">
              {[
                { key: 'week', label: 'This Week' },
                { key: 'month', label: 'This Month' },
                { key: 'allTime', label: 'All Time' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="mb-12">
            <div className="flex items-end justify-center gap-4 mb-8">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-80 p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="text-2xl font-bold text-gray-300">2nd Place</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm">Operator</div>
                    <div className="font-mono text-cyan-400">{top3[1]?.wallet}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">CTC Earned</div>
                      <div className="text-xl font-bold text-purple-400">{top3[1]?.ctcEarned.toLocaleString()} CTC</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Integrity</div>
                      <div className="text-xl font-bold text-green-400">{top3[1]?.integrity}%</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Devices</div>
                    <div className="text-lg">{top3[1]?.devices} devices</div>
                  </div>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-96 p-8 rounded-2xl border border-purple-500/30 backdrop-blur-lg bg-purple-500/10 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">🥇</div>
                  <div className="text-3xl font-bold text-purple-400">1st Place</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Operator</div>
                    <div className="font-mono text-cyan-400 text-lg">{top3[0]?.wallet}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">CTC Earned</div>
                      <div className="text-2xl font-bold text-purple-400">{top3[0]?.ctcEarned.toLocaleString()} CTC</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Integrity</div>
                      <div className="text-2xl font-bold text-green-400">{top3[0]?.integrity}%</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Devices</div>
                    <div className="text-xl">{top3[0]?.devices} devices</div>
                  </div>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-80 p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="text-2xl font-bold text-gray-300">3rd Place</div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-gray-400 text-sm">Operator</div>
                    <div className="font-mono text-cyan-400">{top3[2]?.wallet}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">CTC Earned</div>
                      <div className="text-xl font-bold text-purple-400">{top3[2]?.ctcEarned.toLocaleString()} CTC</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Integrity</div>
                      <div className="text-xl font-bold text-green-400">{top3[2]?.integrity}%</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Devices</div>
                    <div className="text-lg">{top3[2]?.devices} devices</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Full Table */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
                <h2 className="text-xl font-bold mb-6">Full Rankings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Rank</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Wallet</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Devices</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Data Points</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Integrity</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Subs</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">CTC Earned</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restOfData.map((operator) => (
                        <tr key={operator.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-bold text-lg">{getRankIcon(operator.rank)}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-cyan-400 text-sm">{operator.wallet}</td>
                          <td className="py-3 px-4">{operator.devices}</td>
                          <td className="py-3 px-4 text-gray-300">{operator.dataPoints.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`text-sm ${
                              operator.integrity >= 99 ? 'text-green-400' : 
                              operator.integrity >= 95 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {operator.integrity}%
                            </span>
                          </td>
                          <td className="py-3 px-4">{operator.subscribers}</td>
                          <td className="py-3 px-4 text-purple-400 font-medium">{operator.ctcEarned.toLocaleString()} CTC</td>
                          <td className="py-3 px-4">{getTrendIcon(operator.trend)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Network Stats */}
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
                <h3 className="text-xl font-bold mb-6">Network Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Network Health</span>
                    </div>
                    <span className="text-green-400 font-medium">🟢 Healthy</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Database className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Active Devices</span>
                    </div>
                    <span className="text-purple-400 font-medium">1,847</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-300">Data Points Today</span>
                    </div>
                    <span className="text-cyan-400 font-medium">2.4M</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center space-x-3">
                      <Coins className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">CTC Settled This Month</span>
                    </div>
                    <span className="text-yellow-400 font-medium">84,200 CTC</span>
                  </div>
                </div>
              </div>

              {/* Device Distribution Chart */}
              <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
                <h3 className="text-xl font-bold mb-6">Device Type Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={deviceTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
