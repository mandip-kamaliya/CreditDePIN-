.PHONY: install build test deploy-testnet verify clean

# Install OpenZeppelin contracts
install:
	forge install OpenZeppelin/openzeppelin-contracts --no-commit

# Build the contracts
build:
	forge build

# Run all tests with verbose output
test:
	forge test -vvv

# Run specific test
test-specific:
	forge test -vvv $(TEST)

# Deploy to Creditcoin testnet
deploy-testnet:
	source .env && forge script script/Deploy.s.sol \
		--rpc-url $(CREDITCOIN_TESTNET_RPC) \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		-vvvv

# Verify contract on blockscout
verify:
	forge verify-contract $(CONTRACT_ADDRESS) \
		src/CreditDePIN.sol:CreditDePIN \
		--chain-id 102031 \
		--verifier blockscout \
		--verifier-url https://creditcoin-testnet.blockscout.com/api

# Clean build artifacts
clean:
	forge clean

# Format Solidity code
fmt:
	forge fmt

# Check for gas usage
gas-report:
	forge test --gas-report

# Snapshot tests
snapshot:
	forge snapshot

# Local deployment for testing
deploy-local:
	anvil --fork-url $(CREDITCOIN_TESTNET_RPC) &
	sleep 2
	forge script script/Deploy.s.sol \
		--rpc-url http://localhost:8545 \
		--private-key $(PRIVATE_KEY) \
		--broadcast \
		-vvvv
	pkill anvil || true
