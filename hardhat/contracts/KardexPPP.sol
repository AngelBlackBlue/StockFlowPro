// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KardesPPP is ERC721 {
    address public owner;
    using Counters for Counters.Counter;
    Counters.Counter private tokensIds;

    constructor() ERC721("name", "kardex") {
        owner = msg.sender;
    }

    struct Product {
        uint256 tokenId;
        string uuid;
        string sku;
        uint256 timestamp;
        TypeDetail detail;
        uint256 input;
        uint256 unitCost;
        uint256 output;
        uint256 balance;
        uint256 totalCost;
        uint256 ppp;
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
        uint256 timestamp,
        TypeDetail detail,
        uint256 input,
        uint256 unitCost,
        uint256 output,
        uint256 balance,
        uint256 totalCost,
        uint256 ppp,
        address owner
    );

    function registerBuy(
        string memory uuid,
        string memory sku,
        TypeDetail detail,
        uint256 input,
        uint256 unitCost,
        uint256 balance,
        uint256 totalCost,
        uint256 ppp
    ) public {
        require(msg.sender == owner, "Only the owner can register products");
        require(bytes(uuid).length > 0, "UUID is required");
        require(bytes(sku).length > 0, "SKU is required");
        require(
            detail == TypeDetail.buy || detail == TypeDetail.initial,
            "Detail is required"
        );
        require(input > 0, "Input is required");
        require(unitCost > 0, "Unit cost is required");

        uint256 timestamp = block.timestamp;
        tokensIds.increment();
        uint256 tokenId = tokensIds.current();

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

        emit ProductRegistered(
            tokenId,
            uuid,
            sku,
            timestamp,
            detail,
            input,
            unitCost,
            0,
            balance,
            totalCost,
            ppp,
            msg.sender
        );
    }

    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }
}
