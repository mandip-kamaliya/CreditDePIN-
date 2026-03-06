import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Wifi, Zap, Menu, X, ExternalLink, Wallet } from 'lucide-react'
import { ethers } from 'ethers'

export default function Navbar() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const CREDITCOIN_TESTNET_CHAIN_ID = '0x' + (999).toString(16) // Example chain ID

  useEffect(() => {
    checkConnection()
    checkNetwork()
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const checkNetwork = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        setWrongNetwork(chainId !== CREDITCOIN_TESTNET_CHAIN_ID)
      } catch (error) {
        console.error('Error checking network:', error)
      }
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null)
    } else {
      setAccount(accounts[0])
    }
  }

  const handleChainChanged = () => {
    checkNetwork()
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      setAccount(accounts[0])
      
      // Check if we need to switch networks
      await checkNetwork()
      if (wrongNetwork) {
        await switchNetwork()
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CREDITCOIN_TESTNET_CHAIN_ID }],
      })
      setWrongNetwork(false)
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: CREDITCOIN_TESTNET_CHAIN_ID,
                chainName: 'Creditcoin Testnet',
                nativeCurrency: {
                  name: 'CTC',
                  symbol: 'CTC',
                  decimals: 18,
                },
                rpcUrls: ['https://testnet-rpc.creditcoin.org'],
                blockExplorerUrls: ['https://testnet-explorer.creditcoin.org'],
              },
            ],
          })
          setWrongNetwork(false)
        } catch (addError) {
          console.error('Error adding network:', addError)
        }
      } else {
        console.error('Error switching network:', error)
      }
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const scrollToHowItWorks = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('how-it-works')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/#how-it-works')
    }
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#080b14]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">CreditDePIN</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={scrollToHowItWorks}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              How It Works
            </button>
            <Link 
              to="/marketplace" 
              className={`transition-colors duration-200 font-medium ${
                location.pathname === '/marketplace' 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Marketplace
            </Link>
            <Link 
              to="/leaderboard" 
              className={`transition-colors duration-200 font-medium ${
                location.pathname === '/leaderboard' 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Leaderboard
            </Link>
            <Link 
              to="/dashboard" 
              className={`transition-colors duration-200 font-medium ${
                location.pathname === '/dashboard' 
                  ? 'text-cyan-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Right: Wallet Connection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Connection */}
            {account && !wrongNetwork ? (
              <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 px-4 py-2 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">
                  {truncateAddress(account)}
                </span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-md border border-green-500/30">
                  Testnet
                </span>
              </div>
            ) : wrongNetwork ? (
              <button 
                onClick={switchNetwork}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <Zap className="w-4 h-4" />
                <span>Switch Network</span>
              </button>
            ) : (
              <button 
                onClick={connectWallet}
                disabled={isConnecting}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-white/10 mt-4 pt-4"
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  scrollToHowItWorks()
                  setIsMobileMenuOpen(false)
                }}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium text-left"
              >
                How It Works
              </button>
              <Link 
                to="/marketplace" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === '/marketplace' 
                    ? 'text-cyan-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Marketplace
              </Link>
              <Link 
                to="/leaderboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === '/leaderboard' 
                    ? 'text-cyan-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Leaderboard
              </Link>
              <Link 
                to="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`transition-colors duration-200 font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'text-cyan-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              
              {/* Mobile Wallet Section */}
              <div className="pt-4 border-t border-white/10">
                {account && !wrongNetwork ? (
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 px-4 py-3 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-medium">
                        {truncateAddress(account)}
                      </span>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-md border border-green-500/30">
                      Testnet
                    </span>
                  </div>
                ) : wrongNetwork ? (
                  <button 
                    onClick={() => {
                      switchNetwork()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Switch Network</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      connectWallet()
                      setIsMobileMenuOpen(false)
                    }}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
