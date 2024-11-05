// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Stock is ERC721 {
    address public owner;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721( name, symbol) {
        owner = msg.sender;
    }

    function registerStock(
        string memory uuid,
        string memory sku,
        string memory product,
        string memory description,
        uint memory amount,
        string memory image,
        uint memory buyPrice,
        uint memory sellPrice
    ) public {
        require(msg.sender == owner, "Only owner can register stock");

    }


    
}
