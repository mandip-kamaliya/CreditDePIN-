pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/CreditDePIN.sol";

/**
 * @title DeployScript
 * @dev Deployment script for CreditDePIN contract
 */
contract DeployScript is Script {
    CreditDePIN public depin;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        depin = new CreditDePIN();
        
        console.log("CreditDePIN deployed at:", address(depin));
        console.log("Deployer address:", msg.sender);
        console.log("Network chain ID:", block.chainid);
        
        vm.stopBroadcast();
    }
}
