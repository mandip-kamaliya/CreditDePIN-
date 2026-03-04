pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CreditDePIN.sol";

/**
 * @title CreditDePINTest
 * @dev Comprehensive test suite for CreditDePIN contract
 */
contract CreditDePINTest is Test {
    CreditDePIN public depin;
    address public owner;
    address public user;
    address public stranger;
    
    uint256 public constant MIN_STAKE = 100 ether;
    uint256 public constant MONTHLY_PRICE = 10 ether;
    uint256 public constant PRICE_PER_POINT = 0.001 ether;

    event DeviceRegistered(uint256 indexed deviceId, address indexed owner, string name, uint256 timestamp);
    event DataLogged(uint256 indexed deviceId, bytes32 dataHash, uint256 batchSize, uint256 timestamp);
    event Subscribed(address indexed subscriber, uint256 indexed deviceId, uint256 expiry);
    event RewardsClaimed(uint256 indexed deviceId, uint256 amount);
    event DeviceSlashed(uint256 indexed deviceId);

    function setUp() public {
        owner = address(this);
        user = address(0x1);
        stranger = address(0x2);
        
        depin = new CreditDePIN();
        
        // Fund user for testing
        vm.deal(user, 200 ether);
        vm.deal(stranger, 100 ether);
    }

    function testRegisterDevice() public {
        vm.startPrank(user);
        
        vm.expectEmit(true, true, false, true);
        emit DeviceRegistered(0, user, "Test Weather Station", block.timestamp);
        
        uint256 deviceId = depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        assertEq(deviceId, 0);
        assertEq(depin.deviceCount(), 1);
        
        (address deviceOwner, string memory name, string memory deviceType, string memory location, 
         uint256 stakeAmount, uint256 pricePerPoint, uint256 monthlyPrice, 
         uint256 totalDataPoints, uint256 totalEarned, bool isActive, uint256 registeredAt) = depin.getDevice(0);
        
        assertEq(deviceOwner, user);
        assertEq(name, "Test Weather Station");
        assertEq(deviceType, "Weather");
        assertEq(location, "Mumbai, India");
        assertEq(stakeAmount, MIN_STAKE);
        assertEq(pricePerPoint, PRICE_PER_POINT);
        assertEq(monthlyPrice, MONTHLY_PRICE);
        assertEq(totalDataPoints, 0);
        assertEq(totalEarned, 0);
        assertTrue(isActive);
        assertEq(registeredAt, block.timestamp);
        
        vm.stopPrank();
    }

    function testRegisterDeviceInsufficientStake() public {
        vm.startPrank(user);
        
        vm.expectRevert("Insufficient stake amount");
        depin.registerDevice{value: 50 ether}(
            "Test Device",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        vm.stopPrank();
    }

    function testRegisterDeviceEmptyName() public {
        vm.startPrank(user);
        
        vm.expectRevert("Device name cannot be empty");
        depin.registerDevice{value: MIN_STAKE}(
            "",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        vm.stopPrank();
    }

    function testRegisterDeviceZeroPrice() public {
        vm.startPrank(user);
        
        vm.expectRevert("Price per point must be greater than 0");
        depin.registerDevice{value: MIN_STAKE}(
            "Test Device",
            "Weather",
            "Mumbai, India",
            0,
            MONTHLY_PRICE
        );
        
        vm.stopPrank();
    }

    function testLogDataBatch() public {
        vm.startPrank(user);
        
        // Register device first
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        bytes32 dataHash = keccak256(abi.encodePacked("temp:32.5,humidity:65"));
        uint256 batchSize = 144;
        
        vm.expectEmit(true, false, false, true);
        emit DataLogged(0, dataHash, batchSize, block.timestamp);
        
        depin.logDataBatch(0, dataHash, batchSize);
        
        assertEq(depin.getDataPointCount(0), 1);
        assertEq(depin.getDevice(0).totalDataPoints, batchSize);
        
        vm.stopPrank();
    }

    function testLogDataBatchUnauthorized() public {
        vm.startPrank(stranger);
        
        vm.expectRevert("Only device owner can log data");
        depin.logDataBatch(0, keccak256("test"), 100);
        
        vm.stopPrank();
    }

    function testVerifyDataIntegrity() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        string memory rawData = "temp:32.5";
        bytes32 dataHash = keccak256(abi.encodePacked(rawData));
        uint256 batchSize = 1;
        
        // Log data
        depin.logDataBatch(0, dataHash, batchSize);
        
        // Verify integrity
        bool isValid = depin.verifyDataIntegrity(0, 0, rawData);
        assertTrue(isValid);
        
        // Test with wrong data
        bool isInvalid = depin.verifyDataIntegrity(0, 0, "temp:25.0");
        assertFalse(isInvalid);
        
        vm.stopPrank();
    }

    function testSubscribe() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        vm.stopPrank();
        
        // Subscribe as stranger
        vm.startPrank(stranger);
        
        uint256 expiry = block.timestamp + 30 days;
        
        vm.expectEmit(true, true, false, true);
        emit Subscribed(stranger, 0, expiry);
        
        depin.subscribe{value: MONTHLY_PRICE}(0);
        
        assertEq(depin.getPendingRewards(0), MONTHLY_PRICE);
        
        // Check subscription details
        CreditDePIN.Subscription[] memory subs = depin.getActiveSubscriptions(0);
        assertEq(subs.length, 1);
        assertEq(subs[0].subscriber, stranger);
        assertEq(subs[0].deviceId, 0);
        assertEq(subs[0].amountPaid, MONTHLY_PRICE);
        
        vm.stopPrank();
    }

    function testSubscribeInsufficientPayment() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        vm.stopPrank();
        
        // Try to subscribe with insufficient payment
        vm.startPrank(stranger);
        
        vm.expectRevert("Insufficient payment");
        depin.subscribe{value: 5 ether}(0);
        
        vm.stopPrank();
    }

    function testClaimRewards() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        uint256 initialBalance = user.balance;
        
        vm.stopPrank();
        
        // Subscribe as stranger
        vm.startPrank(stranger);
        depin.subscribe{value: MONTHLY_PRICE}(0);
        vm.stopPrank();
        
        // Claim rewards as device owner
        vm.startPrank(user);
        
        vm.expectEmit(true, false, false, true);
        emit RewardsClaimed(0, MONTHLY_PRICE);
        
        depin.claimRewards(0);
        
        assertEq(user.balance, initialBalance + MONTHLY_PRICE);
        assertEq(depin.getPendingRewards(0), 0);
        assertEq(depin.getDevice(0).totalEarned, MONTHLY_PRICE);
        
        vm.stopPrank();
    }

    function testClaimRewardsUnauthorized() public {
        vm.startPrank(stranger);
        
        vm.expectRevert("Only device owner can claim rewards");
        depin.claimRewards(0);
        
        vm.stopPrank();
    }

    function testClaimRewardsZeroAmount() public {
        vm.startPrank(user);
        
        vm.expectRevert("No rewards to claim");
        depin.claimRewards(0);
        
        vm.stopPrank();
    }

    function testOnlyOwnerCanDeactivate() public {
        vm.startPrank(stranger);
        
        vm.expectRevert("Ownable: caller is not the owner");
        depin.deactivateDevice(0);
        
        vm.stopPrank();
    }

    function testDeactivateDevice() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        assertTrue(depin.getDevice(0).isActive);
        
        vm.stopPrank();
        
        // Deactivate as owner
        vm.expectEmit(true, false, false, false);
        emit DeviceSlashed(0);
        
        depin.deactivateDevice(0);
        
        assertFalse(depin.getDevice(0).isActive);
    }

    function testGetOwnerDevices() public {
        vm.startPrank(user);
        
        // Register multiple devices
        depin.registerDevice{value: MIN_STAKE}(
            "Weather Station 1",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        depin.registerDevice{value: MIN_STAKE}(
            "Energy Monitor 1",
            "Energy",
            "Delhi, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        uint256[] memory devices = depin.getOwnerDevices(user);
        assertEq(devices.length, 2);
        assertEq(devices[0], 0);
        assertEq(devices[1], 1);
        
        vm.stopPrank();
    }

    function testReentrancyProtection() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        vm.stopPrank();
        
        // Create a malicious contract that attempts reentrancy
        MaliciousContract malicious = new MaliciousContract(depin);
        
        // Fund malicious contract
        vm.deal(address(malicious), MONTHLY_PRICE);
        
        // Attempt reentrancy attack
        vm.expectRevert();
        malicious.attemptReentrancy{value: MONTHLY_PRICE}(0);
    }

    function testSubscriptionExpiry() public {
        vm.startPrank(user);
        
        // Register device
        depin.registerDevice{value: MIN_STAKE}(
            "Test Weather Station",
            "Weather",
            "Mumbai, India",
            PRICE_PER_POINT,
            MONTHLY_PRICE
        );
        
        vm.stopPrank();
        
        // Subscribe
        vm.startPrank(stranger);
        depin.subscribe{value: MONTHLY_PRICE}(0);
        
        // Check active subscriptions
        CreditDePIN.Subscription[] memory activeSubs = depin.getActiveSubscriptions(0);
        assertEq(activeSubs.length, 1);
        
        // Fast forward past expiry
        vm.warp(block.timestamp + 31 days);
        
        // Check active subscriptions again
        activeSubs = depin.getActiveSubscriptions(0);
        assertEq(activeSubs.length, 0);
        
        vm.stopPrank();
    }
}

/**
 * @title MaliciousContract
 * @dev Contract to test reentrancy protection
 */
contract MaliciousContract {
    CreditDePIN public target;
    bool public attacking;
    
    constructor(CreditDePIN _target) {
        target = _target;
        attacking = false;
    }
    
    function attemptReentrancy(uint256 deviceId) external payable {
        attacking = true;
        target.subscribe{value: msg.value}(deviceId);
        attacking = false;
    }
    
    fallback() external payable {
        if (attacking) {
            // Attempt reentrant call
            target.subscribe{value: 0.1 ether}(0);
        }
    }
    
    receive() external payable {
        if (attacking) {
            // Attempt reentrant call
            target.subscribe{value: 0.1 ether}(0);
        }
    }
}
