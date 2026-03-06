import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  Zap, 
  Car, 
  Wind, 
  Droplets, 
  Radio,
  Search,
  Filter,
  TrendingUp,
  Users,
  ExternalLink,
  X,
  Check,
  Loader2
} from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import Navbar from '../components/Navbar'

interface DataFeed {
  id: number
  name: string
  type: string
  location: string
  operator: string
  integrity: number
  dataPointsPerDay: number
  subscribers: number
  pricePerPoint: number
  pricePerMonth: number
  sparklineData: { time: string; value: number }[]
  featured?: boolean
}

const sparklineData = [
  { time: '00:00', value: 25 },
  { time: '04:00', value: 22 },
  { time: '08:00', value: 28 },
  { time: '12:00', value: 35 },
  { time: '16:00', value: 32 },
  { time: '20:00', value: 27 },
  { time: '24:00', value: 24 },
]

const featuredFeeds: DataFeed[] = [
  {
    id: 1,
    name: 'Mumbai Weather Station',
    type: 'Weather',
    location: 'Mumbai, India',
    operator: '0xabc...def',
    integrity: 99.8,
    dataPointsPerDay: 1440,
    subscribers: 12,
    pricePerPoint: 0.001,
    pricePerMonth: 10,
    sparklineData,
    featured: true
  },
  {
    id: 2,
    name: 'Delhi Solar Grid Monitor',
    type: 'Energy',
    location: 'Delhi, India',
    operator: '0x789...012',
    integrity: 98.2,
    dataPointsPerDay: 288,
    subscribers: 8,
    pricePerPoint: 0.002,
    pricePerMonth: 15,
    sparklineData,
    featured: true
  },
  {
    id: 3,
    name: 'Bangalore Air Quality',
    type: 'Air Quality',
    location: 'Bangalore, India',
    operator: '0xdef...123',
    integrity: 97.9,
    dataPointsPerDay: 720,
    subscribers: 6,
    pricePerPoint: 0.0015,
    pricePerMonth: 12,
    sparklineData,
    featured: true
  }
]

const allFeeds: DataFeed[] = [
  ...featuredFeeds,
  {
    id: 4,
    name: 'Tokyo Weather Station',
    type: 'Weather',
    location: 'Tokyo, Japan',
    operator: '0x456...789',
    integrity: 99.5,
    dataPointsPerDay: 1440,
    subscribers: 15,
    pricePerPoint: 0.001,
    pricePerMonth: 10,
    sparklineData
  },
  {
    id: 5,
    name: 'New York Energy Monitor',
    type: 'Energy',
    location: 'New York, USA',
    operator: '0x012...345',
    integrity: 98.8,
    dataPointsPerDay: 288,
    subscribers: 10,
    pricePerPoint: 0.002,
    pricePerMonth: 18,
    sparklineData
  },
  {
    id: 6,
    name: 'London GPS Tracker',
    type: 'GPS',
    location: 'London, UK',
    operator: '0x345...678',
    integrity: 96.5,
    dataPointsPerDay: 2160,
    subscribers: 7,
    pricePerPoint: 0.0008,
    pricePerMonth: 8,
    sparklineData
  },
  {
    id: 7,
    name: 'Singapore Air Quality',
    type: 'Air Quality',
    location: 'Singapore',
    operator: '0x678...901',
    integrity: 98.1,
    dataPointsPerDay: 720,
    subscribers: 9,
    pricePerPoint: 0.0015,
    pricePerMonth: 14,
    sparklineData
  },
  {
    id: 8,
    name: 'Sydney Water Monitor',
    type: 'Water',
    location: 'Sydney, Australia',
    operator: '0x890...123',
    integrity: 97.2,
    dataPointsPerDay: 480,
    subscribers: 4,
    pricePerPoint: 0.0012,
    pricePerMonth: 11,
    sparklineData
  },
  {
    id: 9,
    name: 'Berlin IoT Sensor',
    type: 'Custom',
    location: 'Berlin, Germany',
    operator: '0x901...234',
    integrity: 95.8,
    dataPointsPerDay: 960,
    subscribers: 5,
    pricePerPoint: 0.0009,
    pricePerMonth: 9,
    sparklineData
  },
  {
    id: 10,
    name: 'Toronto Weather Station',
    type: 'Weather',
    location: 'Toronto, Canada',
    operator: '0x234...567',
    integrity: 99.2,
    dataPointsPerDay: 1440,
    subscribers: 11,
    pricePerPoint: 0.001,
    pricePerMonth: 10,
    sparklineData
  }
]

const getIconForType = (type: string) => {
  switch (type) {
    case 'Weather': return Cloud
    case 'Energy': return Zap
    case 'GPS': return Car
    case 'Air Quality': return Wind
    case 'Water': return Droplets
    default: return Radio
  }
}

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Popular')
  const [selectedFeed, setSelectedFeed] = useState<DataFeed | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [subscriptionDuration, setSubscriptionDuration] = useState('1')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filteredFeeds = allFeeds.filter(feed => {
    const matchesSearch = feed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feed.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'All' || feed.type === typeFilter
    return matchesSearch && matchesType
  })

  const sortedFeeds = [...filteredFeeds].sort((a, b) => {
    switch (sortBy) {
      case 'Popular':
        return b.subscribers - a.subscribers
      case 'Cheapest':
        return a.pricePerMonth - b.pricePerMonth
      case 'Best Integrity':
        return b.integrity - a.integrity
      default:
        return 0
    }
  })

  const handleSubscribe = (feed: DataFeed) => {
    setSelectedFeed(feed)
    setShowModal(true)
    setIsSuccess(false)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedFeed(null)
    setSubscriptionDuration('1')
    setIsSuccess(false)
  }

  const calculateTotalCost = () => {
    if (!selectedFeed) return 0
    const months = parseInt(subscriptionDuration)
    return selectedFeed.pricePerMonth * months
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />
      
      <div className="pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Data Marketplace</h1>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to verified real-world data feeds. All payments settled on Creditcoin.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search feeds..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="All">All Types</option>
                  <option value="Weather">Weather</option>
                  <option value="Energy">Energy</option>
                  <option value="Air Quality">Air Quality</option>
                  <option value="GPS">GPS</option>
                  <option value="Water">Water</option>
                  <option value="Custom">Custom IoT</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="Popular">Popular</option>
                  <option value="Cheapest">Cheapest</option>
                  <option value="Best Integrity">Best Integrity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Featured Feeds */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Feeds</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFeeds.map((feed, index) => {
                const Icon = getIconForType(feed.type)
                return (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5 hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full mb-1">
                            {feed.type}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              feed.integrity >= 99 ? 'bg-green-400' : 
                              feed.integrity >= 95 ? 'bg-yellow-400' : 'bg-red-400'
                            }`} />
                            <span className="text-sm text-gray-300">{feed.integrity}% integrity</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feed Info */}
                    <h3 className="text-lg font-bold mb-2">{feed.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{feed.location}</p>
                    <p className="text-gray-500 text-xs mb-4">Operator: {feed.operator}</p>

                    {/* Sparkline */}
                    <div className="h-16 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={feed.sparklineData}>
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#06b6d4" 
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Stats */}
                    <div className="text-sm text-gray-300 mb-4">
                      {feed.dataPointsPerDay.toLocaleString()} pts/day | {feed.subscribers} subscribers
                    </div>

                    {/* Pricing */}
                    <div className="text-sm mb-4">
                      <span className="text-cyan-400">{feed.pricePerPoint} CTC/point</span> | 
                      <span className="text-purple-400 ml-2">{feed.pricePerMonth} CTC/month</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSubscribe(feed)}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Subscribe Monthly
                      </button>
                      <button className="flex-1 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-4 py-2 rounded-lg font-medium transition-all duration-300">
                        Buy Single Batch
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* All Feeds Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Feeds</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Device</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Data Pts/day</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Integrity</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Subs</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Price/mo</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFeeds.map((feed) => {
                    const Icon = getIconForType(feed.type)
                    return (
                      <tr key={feed.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="text-white font-medium">{feed.name}</div>
                            <div className="text-gray-500 text-xs">{feed.operator}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-purple-400" />
                            <span>{feed.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{feed.location}</td>
                        <td className="py-3 px-4 text-gray-300">{feed.dataPointsPerDay.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`text-sm ${
                            feed.integrity >= 99 ? 'text-green-400' : 
                            feed.integrity >= 95 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {feed.integrity}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{feed.subscribers}</td>
                        <td className="py-3 px-4 text-purple-400">{feed.pricePerMonth} CTC</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleSubscribe(feed)}
                            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            Subscribe
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Settlement Banner */}
          <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
            <h3 className="text-xl font-bold mb-3">How Settlement Works</h3>
            <p className="text-gray-300">
              When you subscribe, CTC locks in a smart contract. Operators receive payment every 24h as data is verified on-chain. 
              Cancel anytime — unused CTC refunded instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {showModal && selectedFeed && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#080b14] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            {!isSuccess ? (
              <>
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Subscribe to Data Feed</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Feed Summary */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    {(() => {
                      const Icon = getIconForType(selectedFeed.type)
                      return <Icon className="w-5 h-5 text-purple-400" />
                    })()}
                    <span className="text-purple-300">{selectedFeed.type}</span>
                    <span className={`text-sm ${
                      selectedFeed.integrity >= 99 ? 'text-green-400' : 
                      selectedFeed.integrity >= 95 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedFeed.integrity}% integrity
                    </span>
                  </div>
                  <h4 className="font-bold text-white mb-1">{selectedFeed.name}</h4>
                  <p className="text-gray-400 text-sm">{selectedFeed.location}</p>
                  <div className="mt-3 text-sm text-gray-300">
                    {selectedFeed.dataPointsPerDay.toLocaleString()} pts/day | {selectedFeed.subscribers} subscribers
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">Subscription Duration</label>
                  <div className="space-y-2">
                    {[
                      { value: '1', label: '1 month', price: selectedFeed.pricePerMonth },
                      { value: '3', label: '3 months', price: selectedFeed.pricePerMonth * 3 },
                      { value: '6', label: '6 months', price: selectedFeed.pricePerMonth * 6 },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:border-purple-500/30 cursor-pointer transition-colors">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="duration"
                            value={option.value}
                            checked={subscriptionDuration === option.value}
                            onChange={(e) => setSubscriptionDuration(e.target.value)}
                            className="w-4 h-4 text-purple-500 bg-white/5 border-white/10 focus:ring-purple-500"
                          />
                          <span>{option.label}</span>
                        </div>
                        <span className="text-purple-400 font-medium">{option.price} CTC</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Total Cost */}
                <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">Total Cost:</span>
                    <span className="text-2xl font-bold text-white">{calculateTotalCost()} CTC</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Confirm & Pay with CTC</span>
                  )}
                </button>
              </>
            ) : (
              /* Success State */
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white">Subscription Successful!</h3>
                
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-gray-400 text-sm mb-1">Transaction Hash</div>
                  <code className="text-cyan-400 text-sm">0x7f3a9b2c4d5e6f8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4</code>
                </div>
                
                <div className="text-gray-300">
                  You now have access to {selectedFeed.name} for {subscriptionDuration} month(s)
                </div>
                
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
