import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Cloud,
  Zap,
  Car,
  Wind,
  Droplets,
  Radio,
  ArrowLeft,
  ArrowRight,
  Copy,
  ExternalLink,
  Loader2
} from 'lucide-react'
import Navbar from '../components/Navbar'

interface FormData {
  deviceName: string
  deviceType: string
  description: string
  city: string
  country: string
  dataFrequency: string
  stakeAmount: number
  pricePerPoint: number
  monthlyPrice: number
}

const deviceTypes = [
  { value: 'weather', label: 'Weather Station', icon: Cloud },
  { value: 'energy', label: 'Energy Meter', icon: Zap },
  { value: 'gps', label: 'GPS Tracker', icon: Car },
  { value: 'air', label: 'Air Quality', icon: Wind },
  { value: 'water', label: 'Water Monitor', icon: Droplets },
  { value: 'custom', label: 'Custom IoT', icon: Radio },
]

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [deviceId, setDeviceId] = useState('')

  const [formData, setFormData] = useState<FormData>({
    deviceName: '',
    deviceType: '',
    description: '',
    city: '',
    country: '',
    dataFrequency: '5min',
    stakeAmount: 100,
    pricePerPoint: 0.001,
    monthlyPrice: 10,
  })

  const userBalance = 1500 // Mock user balance

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateEarnings = () => {
    const subscribers = 5 // Mock calculation
    const dailyEarnings = subscribers * formData.pricePerPoint * 1440 / (parseInt(formData.dataFrequency) || 5)
    const monthlyEarnings = dailyEarnings * 30
    return monthlyEarnings.toFixed(2)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock success data
    setTxHash('0x7f3a9b2c4d5e6f8a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4b291')
    setDeviceId('1847')
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getSelectedDeviceType = () => {
    return deviceTypes.find(type => type.value === formData.deviceType)
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${step === currentStep
              ? 'bg-purple-500 text-white'
              : step < currentStep
                ? 'bg-purple-500/30 text-purple-300'
                : 'bg-white/10 text-gray-400'
              }`}
          >
            {step < currentStep ? '✓' : step}
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-0.5 mx-2 transition-all ${step < currentStep ? 'bg-purple-500' : 'bg-white/10'
                }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Device Name *</label>
        <input
          type="text"
          value={formData.deviceName}
          onChange={(e) => updateFormData('deviceName', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          placeholder="My Weather Station"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">Device Type *</label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {deviceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => updateFormData('deviceType', type.value)}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden text-left ${formData.deviceType === type.value
                ? 'border-primary bg-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                : 'border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10'
                }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 ${formData.deviceType === type.value ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
              <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                <div className={`p-3 rounded-full transition-colors duration-300 ${formData.deviceType === type.value ? 'bg-primary border border-primary/50' : 'bg-gray-800 border border-gray-700 group-hover:bg-primary/20'}`}>
                  <type.icon className={`w-8 h-8 transition-colors duration-300 ${formData.deviceType === type.value ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                </div>
                <div className={`font-semibold text-center transition-colors duration-300 ${formData.deviceType === type.value ? 'text-white' : 'text-gray-300'}`}>{type.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
          placeholder="Describe your device and the data it collects..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="Mumbai"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => updateFormData('country', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            placeholder="India"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Data Frequency</label>
        <div className="space-y-2">
          {[
            { value: '1min', label: 'Every 1 minute' },
            { value: '5min', label: 'Every 5 minutes' },
            { value: '15min', label: 'Every 15 minutes' },
            { value: '1hour', label: 'Every 1 hour' },
          ].map((freq) => (
            <label key={freq.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="frequency"
                value={freq.value}
                checked={formData.dataFrequency === freq.value}
                onChange={(e) => updateFormData('dataFrequency', e.target.value)}
                className="w-4 h-4 text-purple-500 bg-white/5 border-white/10 focus:ring-purple-500"
              />
              <span className="text-gray-300">{freq.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setCurrentStep(2)}
          disabled={!formData.deviceName || !formData.deviceType}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="p-4 rounded-lg bg-purple-500/20 border border-purple-500/30">
        <p className="text-purple-300 text-sm">
          Staking ensures data integrity. Fraudulent devices lose their stake. Higher stake = higher trust score.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Stake Amount (CTC)</label>
        <input
          type="number"
          value={formData.stakeAmount}
          onChange={(e) => updateFormData('stakeAmount', parseFloat(e.target.value) || 0)}
          min="100"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <div className="mt-2 text-sm text-gray-400">
          Your balance: {userBalance} CTC
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Price per data point (CTC)</label>
        <input
          type="number"
          value={formData.pricePerPoint}
          onChange={(e) => updateFormData('pricePerPoint', parseFloat(e.target.value) || 0)}
          step="0.0001"
          min="0.0001"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Monthly subscription price (CTC)</label>
        <input
          type="number"
          value={formData.monthlyPrice}
          onChange={(e) => updateFormData('monthlyPrice', parseFloat(e.target.value) || 0)}
          min="1"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      <div className="p-4 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
        <div className="text-cyan-300 font-medium mb-1">Live Earnings Calculator</div>
        <div className="text-white">
          Estimated with 5 subscribers: ~{calculateEarnings()} CTC/month
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={formData.stakeAmount < 100 || formData.stakeAmount > userBalance}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="p-6 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
        <h3 className="text-xl font-bold mb-4">Device Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Device Name:</span>
            <span className="text-white">{formData.deviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-white">{getSelectedDeviceType()?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Location:</span>
            <span className="text-white">{formData.city}, {formData.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Data Frequency:</span>
            <span className="text-white">{formData.dataFrequency}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Stake Amount:</span>
            <span className="text-white">{formData.stakeAmount} CTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price per Point:</span>
            <span className="text-white">{formData.pricePerPoint} CTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Monthly Price:</span>
            <span className="text-white">{formData.monthlyPrice} CTC</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-12 py-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting to Creditcoin...</span>
            </>
          ) : (
            <span>Deploy to Creditcoin Testnet</span>
          )}
        </button>
      </div>
    </motion.div>
  )

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <span className="text-2xl">✅</span>
      </div>

      <h2 className="text-2xl font-bold text-white">Device Registered Successfully!</h2>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-gray-400 text-sm mb-1">Transaction Hash</div>
          <div className="flex items-center justify-center space-x-2">
            <code className="text-cyan-400">{txHash}</code>
            <button
              onClick={() => copyToClipboard(txHash)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-gray-400 text-sm mb-1">Device ID</div>
          <div className="text-white text-lg font-bold">#{deviceId}</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <a
          href={`https://creditcoin-testnet.blockscout.com/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-cyan-500/30 flex items-center space-x-2"
        >
          <span>View on Explorer</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        <Link
          to="/dashboard"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          Go to Dashboard →
        </Link>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar />

      <div className="pt-16 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Register Your Device</h1>

          {!isSuccess && renderStepIndicator()}

          <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-lg bg-white/5">
            {isSuccess ? renderSuccess() : (
              <>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
