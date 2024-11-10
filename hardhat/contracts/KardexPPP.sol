// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KardesPPP is ERC721 {
    address public owner;
    uint256 private nextTokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        owner = msg.sender;
    }
    
    struct Product {
        uint256 tokenId;
        string uuid;
        string sku;
        uint timestamp;
        TypeDetail detail;
        uint input;
        uint unitCost;
        uint output;
        uint balance;
        uint totalCost;
        uint ppp;
    }

    enum TypeDetail {
        initial,
        buy,
        sell
    }

    Product[] private products;

    event ProductRegistered(
        uint256 tokenId,
        string uuid,
        string sku,
        uint timestamp,
        TypeDetail detail,
        uint input,
        uint unitCost,
        uint output,
        uint balance,
        uint totalCost,
        uint ppp,
        address owner
    );


    function registerBuy(
        string memory uuid,
        string memory sku,
        TypeDetail detail,
        uint input,
        uint unitCost,
        uint balance,
        uint totalCost,
        uint ppp
    ) public {
        require(msg.sender == owner, "Only the owner can register products");
        require(bytes(uuid).length > 0, "UUID is required");
        require(bytes(sku).length > 0, "SKU is required");
        require(detail == TypeDetail.buy || detail == TypeDetail.initial, "Detail is required");
        require(input > 0, "Input is required");
        require(unitCost > 0, "Unit cost is required");

        uint timestamp = block.timestamp;
        uint256 tokenId = nextTokenId++;

        Product memory newProduct = Product({
            tokenId: tokenId,
            uuid: uuid,
            sku: sku,
            timestamp: timestamp,
            detail: detail,
            input: input,
            unitCost: unitCost,
            output: 0,
            balance: balance,
            totalCost: totalCost,
            ppp: ppp
        });

        products.push(newProduct);
        _safeMint(msg.sender, tokenId);

        emit ProductRegistered(tokenId, uuid, sku, timestamp, detail, input, unitCost, 0, balance, totalCost, ppp, msg.sender);
    }

    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }
}
