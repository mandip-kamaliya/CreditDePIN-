// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CreditDePIN
 * @dev Smart contract for managing IoT device data feeds and subscriptions on Creditcoin network
 * @author CreditDePIN Team
 */
contract CreditDePIN is ReentrancyGuard, Ownable {
    // Constants
    uint256 public constant MIN_STAKE = 100 ether;
    uint256 public constant SUBSCRIPTION_DURATION = 30 days;

    // Structs
    struct Device {
        address owner;
        string name;
        string deviceType;
        string location;
        uint256 stakeAmount;
        uint256 pricePerPoint;
        uint256 monthlyPrice;
        uint256 totalDataPoints;
        uint256 totalEarned;
        bool isActive;
        uint256 registeredAt;
    }

    struct DataPoint {
        bytes32 dataHash;
        uint256 timestamp;
        uint256 batchSize;
    }

    struct Subscription {
        address subscriber;
        uint256 deviceId;
        uint256 expiry;
        uint256 amountPaid;
    }

    // State variables
    mapping(uint256 => Device) public devices;
    mapping(uint256 => DataPoint[]) public dataPoints;
    mapping(uint256 => Subscription[]) public subscriptions;
    mapping(uint256 => uint256) public pendingRewards;
    mapping(address => uint256[]) public ownerDevices;
    uint256 public deviceCount;

    // Events
    event DeviceRegistered(uint256 indexed deviceId, address indexed owner, string name, uint256 timestamp);
    event DataLogged(uint256 indexed deviceId, bytes32 dataHash, uint256 batchSize, uint256 timestamp);
    event Subscribed(address indexed subscriber, uint256 indexed deviceId, uint256 expiry);
    event RewardsClaimed(uint256 indexed deviceId, uint256 amount);
    event DeviceSlashed(uint256 indexed deviceId);

    /**
     * @dev Register a new IoT device
     * @param name Name of the device
     * @param deviceType Type of device (Weather, Energy, GPS, etc.)
     * @param location Physical location of the device
     * @param pricePerPoint Price per data point in CTC
     * @param monthlyPrice Monthly subscription price in CTC
     */
    function registerDevice(
        string memory name,
        string memory deviceType,
        string memory location,
        uint256 pricePerPoint,
        uint256 monthlyPrice
    ) external payable {
        require(msg.value >= MIN_STAKE, "Insufficient stake amount");
        require(bytes(name).length > 0, "Device name cannot be empty");
        require(bytes(deviceType).length > 0, "Device type cannot be empty");
        require(bytes(location).length > 0, "Location cannot be empty");
        require(pricePerPoint > 0, "Price per point must be greater than 0");
        require(monthlyPrice > 0, "Monthly price must be greater than 0");

        uint256 deviceId = deviceCount++;
        
        devices[deviceId] = Device({
            owner: msg.sender,
            name: name,
            deviceType: deviceType,
            location: location,
            stakeAmount: msg.value,
            pricePerPoint: pricePerPoint,
            monthlyPrice: monthlyPrice,
            totalDataPoints: 0,
            totalEarned: 0,
            isActive: true,
            registeredAt: block.timestamp
        });

        ownerDevices[msg.sender].push(deviceId);
        
        emit DeviceRegistered(deviceId, msg.sender, name, block.timestamp);
    }

    /**
     * @dev Log a batch of data points from a device
     * @param deviceId ID of the device
     * @param dataHash Hash of the batched data
     * @param batchSize Number of data points in the batch
     */
    function logDataBatch(
        uint256 deviceId,
        bytes32 dataHash,
        uint256 batchSize
    ) external {
        require(devices[deviceId].owner == msg.sender, "Only device owner can log data");
        require(devices[deviceId].isActive, "Device must be active");
        require(batchSize > 0, "Batch size must be greater than 0");
        require(dataHash != bytes32(0), "Data hash cannot be empty");

        dataPoints[deviceId].push(DataPoint({
            dataHash: dataHash,
            timestamp: block.timestamp,
            batchSize: batchSize
        }));

        devices[deviceId].totalDataPoints += batchSize;
        
        emit DataLogged(deviceId, dataHash, batchSize, block.timestamp);
    }

    /**
     * @dev Subscribe to a device's data feed
     * @param deviceId ID of the device to subscribe to
     */
    function subscribe(uint256 deviceId) external payable nonReentrant {
        require(devices[deviceId].isActive, "Device must be active");
        require(msg.value >= devices[deviceId].monthlyPrice, "Insufficient payment");

        uint256 expiry = block.timestamp + SUBSCRIPTION_DURATION;
        
        subscriptions[deviceId].push(Subscription({
            subscriber: msg.sender,
            deviceId: deviceId,
            expiry: expiry,
            amountPaid: msg.value
        }));

        pendingRewards[deviceId] += msg.value;
        
        emit Subscribed(msg.sender, deviceId, expiry);
    }

    /**
     * @dev Claim accumulated rewards for a device
     * @param deviceId ID of the device
     */
    function claimRewards(uint256 deviceId) external nonReentrant {
        require(devices[deviceId].owner == msg.sender, "Only device owner can claim rewards");
        
        uint256 amount = pendingRewards[deviceId];
        require(amount > 0, "No rewards to claim");

        pendingRewards[deviceId] = 0;
        devices[deviceId].totalEarned += amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit RewardsClaimed(deviceId, amount);
    }

    /**
     * @dev Verify the integrity of a specific data point
     * @param deviceId ID of the device
     * @param pointIndex Index of the data point in the array
     * @param rawData Raw data to verify against stored hash
     * @return True if data integrity is verified
     */
    function verifyDataIntegrity(
        uint256 deviceId,
        uint256 pointIndex,
        string calldata rawData
    ) external view returns (bool) {
        require(pointIndex < dataPoints[deviceId].length, "Invalid point index");
        
        bytes32 computedHash = keccak256(abi.encodePacked(rawData));
        return computedHash == dataPoints[deviceId][pointIndex].dataHash;
    }

    /**
     * @dev Deactivate a device (only contract owner)
     * @param deviceId ID of the device to deactivate
     */
    function deactivateDevice(uint256 deviceId) external onlyOwner {
        require(deviceId < deviceCount, "Device does not exist");
        devices[deviceId].isActive = false;
        emit DeviceSlashed(deviceId);
    }

    // View functions

    /**
     * @dev Get device information
     * @param deviceId ID of the device
     * @return Device struct
     */
    function getDevice(uint256 deviceId) external view returns (Device memory) {
        require(deviceId < deviceCount, "Device does not exist");
        return devices[deviceId];
    }

    /**
     * @dev Get the count of data points for a device
     * @param deviceId ID of the device
     * @return Number of data points
     */
    function getDataPointCount(uint256 deviceId) external view returns (uint256) {
        return dataPoints[deviceId].length;
    }

    /**
     * @dev Get all devices owned by an address
     * @param owner Address of the owner
     * @return Array of device IDs
     */
    function getOwnerDevices(address owner) external view returns (uint256[] memory) {
        return ownerDevices[owner];
    }

    /**
     * @dev Get active subscriptions for a device
     * @param deviceId ID of the device
     * @return Array of active subscriptions
     */
    function getActiveSubscriptions(uint256 deviceId) external view returns (Subscription[] memory) {
        Subscription[] memory allSubs = subscriptions[deviceId];
        uint256 activeCount = 0;
        
        // Count active subscriptions
        for (uint256 i = 0; i < allSubs.length; i++) {
            if (allSubs[i].expiry > block.timestamp) {
                activeCount++;
            }
        }
        
        // Create array of active subscriptions
        Subscription[] memory activeSubs = new Subscription[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allSubs.length; i++) {
            if (allSubs[i].expiry > block.timestamp) {
                activeSubs[index] = allSubs[i];
                index++;
            }
        }
        
        return activeSubs;
    }

    /**
     * @dev Get pending rewards for a device
     * @param deviceId ID of the device
     * @return Amount of pending rewards
     */
    function getPendingRewards(uint256 deviceId) external view returns (uint256) {
        return pendingRewards[deviceId];
    }
}
