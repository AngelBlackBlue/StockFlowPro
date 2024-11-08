// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Stock is ERC721 {
    address public owner;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        owner = msg.sender;
    }

    struct Product {
        string uuid;
        string sku;
        string product;
        string description;
        uint amount;
        string image;
        uint buyPrice;
        uint sellPrice;
        uint timestamp;
    }

    mapping(uint256 => Product) private productDetails;

    uint256 private tokenIdCounter;

    function  getTokenIdCounter() public view returns (uint256) {
        return tokenIdCounter;
    }
            

    event ProductRegistered(
        uint256 tokenId,
        string uuid,
        string sku,
        string product,
        string description,
        uint amount,
        string image,
        uint buyPrice,
        uint sellPrice,
        uint timestamp,
        address owner
    );

    function registerProduct(
        string memory uuid,
        string memory sku,
        string memory product,
        string memory description,
        uint amount,
        string memory image,
        uint buyPrice,
        uint sellPrice
    ) public {
        require(msg.sender == owner, "Only the owner can register products");

        require(bytes(uuid).length > 0, "UUID is required");
        require(bytes(sku).length > 0, "SKU is required");
        require(bytes(product).length > 0, "Product name is required");
        require(bytes(description).length > 0, "Description is required");
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(image).length > 0, "Image is required");
        // require(buyPrice > 0, "Buy price must be greater than 0");
        // require(sellPrice > 0, "Sell price must be greater than 0");

        uint tokenId = tokenIdCounter++;
        uint timestamp = block.timestamp;

        productDetails[tokenId] = Product({
            uuid: uuid,
            sku: sku,
            product: product,
            description: description,
            amount: amount,
            image: image,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            timestamp: timestamp
        });

        _safeMint(msg.sender, tokenId);

        emit ProductRegistered(
            tokenId,
            uuid,
            sku,
            product,
            description,
            amount,
            image,
            buyPrice,
            sellPrice,
            timestamp,
            msg.sender
        );
    }

}
