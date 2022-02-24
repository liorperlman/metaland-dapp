// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";
import "./Ownable.sol";

contract PurchaseLand is ERC721, Ownable {
    address[80] public owners;
    uint256 balance;

    event LandBought(address indexedFrom, uint256 landId, address owner);

    constructor() ERC721("MetaLand", "MND") {}

    function purchase(uint256 landId) public payable returns (uint256) {
        require(landId >= 0 && landId <= 79);
        require(owners[landId] == 0x0000000000000000000000000000000000000000);
        transferFrom(0x0000000000000000000000000000000000000000, msg.sender, landId);
        owners[landId] = msg.sender;
        emit LandBought(msg.sender, landId, owners[landId]);
        return landId;
    }
    // Retrieving the owners
    function getOwners() public view returns (address[80] memory) {
        return owners;
    }
    // Retrieving specific owner
    function getOwner(uint256 landId) public view returns (address owner) {
        return owners[landId];
    }
}
