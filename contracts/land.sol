

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";
import "./Ownable.sol";

 

contract Land is ERC721, Ownable {

address[80] public owners;
  

  constructor() ERC721("MetaLand","MND") {

  }

  function buyLand (uint landId) payable public returns (uint) {
    require(landId >= 0 && landId <= 79);
    owners[landId] = msg.sender;
    return landId;
  }

}