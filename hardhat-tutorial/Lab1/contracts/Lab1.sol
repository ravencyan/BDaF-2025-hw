//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

contract Lab1 {
    // Specify wallet owner (which can withdraw ETH)
    address public owner;
    
    // Set owner address
    constructor(address _owner) {
        owner = _owner;
    }

    // Event that will be sent onto the blockchain
    event Received(address indexed sender, uint256 amount);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "You are not the owner of the wallet.");
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No ETH to withdraw.");
        payable(msg.sender).transfer(contractBalance);
    }

}