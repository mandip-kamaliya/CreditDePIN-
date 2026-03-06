import { useState, useEffect } from 'react'

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      // Wallet connection logic will go here
      console.log('Connecting wallet...')
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
  }

  return {
    account,
    isConnecting,
    connectWallet,
    disconnectWallet
  }
}
