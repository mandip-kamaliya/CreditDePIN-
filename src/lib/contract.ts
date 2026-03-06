import { ethers } from 'ethers'

// Contract ABI and address will go here
export const CONTRACT_ADDRESS = ''

export const CONTRACT_ABI = [
  // Contract ABI will be added here
]

export function getContract(provider: ethers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
}
