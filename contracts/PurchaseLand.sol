// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";
import "./Ownable.sol";

contract PurchaseLand is ERC721 {
    address payable[320] public owners;
    // uint256 balance;
    address payable owner;
    uint256 gasPrice = 0.025 ether;
    uint256 price;
    

    event LandBought(address indexedFrom, uint256 landId, address owner);
    event LandTransfer(address from, address to, uint landId);

    constructor() ERC721("MetaLand", "MND") {
        owner = payable(msg.sender);
    }

    function purchase(uint256 landId) public payable returns (uint256) {
        require(landId >= 0 && landId <= 799);
        require(owners[landId] == 0x0000000000000000000000000000000000000000);
        _mint(msg.sender, landId);
        owners[landId] = payable(msg.sender);
        emit LandBought(msg.sender, landId, owners[landId]);
        return landId;
    }
    // Retrieving the owners
    function getOwners() public view returns (address payable[320] memory) {
        return owners;
    }
    // Retrieving specific owner
    function getOwner(uint256 landId) public view returns (address payable landOwner) {
        return owners[landId];
    }
    function transferLand(address payable from, address payable to, uint256 landId ) public virtual  returns (uint256) {
        //solhint-disable-next-line max-line-length
        _transfer(from, to, landId);
        owners[landId] = to;
        emit LandTransfer(from ,to ,landId);
        return landId;
    }

    
}
