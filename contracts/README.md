# CreditDePIN Smart Contracts

Foundry project for the CreditDePIN IoT data marketplace smart contracts.

## Overview

The CreditDePIN contract enables:
- IoT device registration with staking
- Data batch logging with integrity verification
- Subscription-based data feed access
- Reward distribution and claiming
- Device management and deactivation

## Contract Structure

### Main Contract: `CreditDePIN.sol`

**Key Features:**
- Device registration with minimum 100 CTC stake
- Data batch logging with hash-based integrity
- Monthly subscription system (30 days)
- Reward claiming for device operators
- Owner-controlled device deactivation
- Reentrancy protection

**Constants:**
- `MIN_STAKE = 100 ether` (100 CTC)
- `SUBSCRIPTION_DURATION = 30 days`

**Core Functions:**
- `registerDevice()` - Register new IoT device
- `logDataBatch()` - Log batched data points
- `subscribe()` - Subscribe to device data feed
- `claimRewards()` - Claim accumulated rewards
- `verifyDataIntegrity()` - Verify data integrity
- `deactivateDevice()` - Owner-only device deactivation

## Setup

### Prerequisites
- Foundry installed
- Node.js (for frontend integration)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd contracts

# Install dependencies
make install

# Copy environment file
cp .env.example .env
# Edit .env with your private key and RPC URL
```

## Usage

### Testing

```bash
# Run all tests
make test

# Run specific test
make test-specific TEST=testRegisterDevice

# Gas report
make gas-report
```

### Building

```bash
# Build contracts
make build

# Format code
make fmt
```

### Deployment

```bash
# Deploy to Creditcoin testnet
make deploy-testnet

# Verify contract
make verify CONTRACT_ADDRESS=0x...
```

## Testing Coverage

The test suite covers:
- ✅ Device registration (valid/invalid cases)
- ✅ Data batch logging and verification
- ✅ Subscription functionality
- ✅ Reward claiming
- ✅ Access control (owner-only functions)
- ✅ Reentrancy protection
- ✅ Subscription expiry
- ✅ Edge cases and error conditions

## Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Owner-only administrative functions
- **Input Validation**: Comprehensive parameter checks
- **Event Logging**: Full audit trail
- **Hash-based Integrity**: Tamper-proof data verification

## Gas Optimization

- Optimized storage layout
- Efficient data structures
- Minimal external calls
- Batch operations support

## Network Configuration

**Creditcoin Testnet:**
- Chain ID: 102031
- RPC: `https://rpc.cc3-testnet.creditcoin.network`
- Explorer: `https://creditcoin-testnet.blockscout.com`

## Integration

The contract is designed to integrate with the frontend application through:
- **Wallet Connection**: MetaMask/WalletConnect
- **Event Listening**: Real-time updates
- **Transaction Handling**: User-friendly transaction flows

## License

MIT License - see LICENSE file for details.
