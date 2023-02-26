// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SayGm {
    event newMessage(address indexed sender, string message, uint256 timestamp);

    gmMessage[] public gmMessages;

    struct gmMessage {
        address sender;
        string message;
        uint256 timestamp;
    }

    function sayGm(string calldata message) external {
        gmMessages.push(gmMessage(msg.sender, message, block.timestamp));
        emit newMessage(msg.sender, message, block.timestamp);
    }

    function getMessages() public view returns (gmMessage[] memory) {
        return (gmMessages);
    }
}
