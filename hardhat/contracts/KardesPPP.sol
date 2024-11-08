// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract KardesPPP is ERC721 {
    address public owner;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        owner = msg.sender;
    }

    struct Product {
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

    mapping(uint256 => Product) private productDetails;

    uint256 private tokenIdCounter;

    function getTokenIdCounter() public view returns (uint256) {
        return tokenIdCounter;
    }

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
        uint output,
        uint balance,
        uint totalCost,
        uint ppp
    ) public {
        require(msg.sender == owner, "Only the owner can register products");

        require(bytes(uuid).length > 0, "UUID is required");
        require(bytes(sku).length > 0, "SKU is required");
        require(input > 0, "Input is required");
        require(unitCost > 0, "Unit cost is required");
        require(output == 0, "Output is 0 for register buy");
        require(balance >= 0, "Balance is required");
        require(totalCost >= 0, "Total cost is required");
        require(ppp >= 0, "PPP is required");

        uint tokenId = tokenIdCounter++;
        uint timestamp = block.timestamp;

        productDetails[tokenId] = Product({
            uuid: uuid,
            sku: sku,
            timestamp: timestamp,
            detail: detail,
            input: input,
            unitCost: unitCost,
            output: output,
            balance: balance,
            totalCost: totalCost,
            ppp: ppp,
        });

        _safeMint(msg.sender, tokenId);

        emit ProductRegistered(
            tokenId,
            uuid,
            sku,
            timestamp,
            detail,
            input,
            unitCost,
            output,
            balance,
            totalCost,
            ppp,
            msg.sender
        );
    }
}
