

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokens/ERC721.sol";
import "./Ownable.sol";
 

contract newNFT is ERC721, Ownable {
 
  constructor() {
    nftName = "Synth NFT";
    nftSymbol = "SYN";
  }
}