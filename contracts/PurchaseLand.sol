// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";
import "./Ownable.sol";

contract PurchaseLand is ERC721, Ownable {
    address[100] public owners;
    uint256 balance;

    event LandBought(address indexedFrom, uint256 landId, address owner);
    event LandTransfer(address from, address to, uint landId);

    constructor() ERC721("MetaLand", "MND") {}

    function purchase(uint256 landId) public payable returns (uint256) {
        require(landId >= 0 && landId <= 99);
        require(owners[landId] == 0x0000000000000000000000000000000000000000);
        _mint(msg.sender, landId);
        owners[landId] = msg.sender;
        emit LandBought(msg.sender, landId, owners[landId]);
        return landId;
    }
    // Retrieving the owners
    function getOwners() public view returns (address[100] memory) {
        return owners;
    }
    // Retrieving specific owner
    function getOwner(uint256 landId) public view returns (address owner) {
        return owners[landId];
    }

    function transferLand(address from, address to, uint256 landId ) public virtual returns (uint256) {
        transferFrom(from, to, landId);
        owners[landId] = to;
        emit LandTransfer(from ,to ,landId);
        return landId;
    }
}
