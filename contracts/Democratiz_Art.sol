// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

//Console functions to help debug the smart contract just like in Javascript
import "../node_modules/hardhat/console.sol";
/// @dev Import contracts from openzeppelin
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract Democratiz_Art is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0015 ether;

    address payable owner;

    address private superAdmin;

    mapping(address => bool) private admins;

    mapping(address => bool) private artists;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event AdminRegistered(address _address);

    event ArtistRegistered(address _address);

    event idToMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("NFT Democratiz_Art", "DANFT") {
        owner == payable(msg.sender);
        superAdmin = msg.sender; // 'msg.sender' is superAdmin
    }

    ///@dev Returns the address of the superAdmin.
    function checkSuperAdmin() public view virtual returns (address) {
        return superAdmin;
    }

    /// @dev manage artists and admin access
    function registerAdmin(address _address) public {
        require(
            superAdmin == msg.sender,
            unicode"Les Administrateurs ne peuvent être enrgistrés que par le superAdmin"
        );
        require(!admins[_address], unicode"Cette personne est déjà admin.");
        admins[_address] = true;
        emit AdminRegistered(_address);
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], unicode"Vous n'êtes pas administrateur");
        _;
    }

    function registerArtist(address _address) public onlyAdmin {
        require(!artists[_address], unicode"Artiste déjà enregistré.");
        artists[_address] = true;
        emit ArtistRegistered(_address);
    }

    modifier onlyArtist() {
        require(
            artists[msg.sender],
            unicode"Vous n'êtes pas inscrit en tant qu'artiste."
        );
        _;
    }

    /// @notice Returns if the wallet is registered as Admin.
    /// @dev  Returns data from the mapping artists.
    function adminRegistered(address _address) public view returns (bool) {
        return admins[_address];
    }

    /// @notice Returns if the wallet is registered as Artist.
    /// @dev  Returns data from the mapping artists.
    function artistRegistered(address _address) public view returns (bool) {
        return artists[_address];
    }

    /// @dev Charge money for Democratiz_Art
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            unicode"Le prix du listing sur la plateforme ne peut être modifié que par le propriétaire du contrat"
        );
        listingPrice = _listingPrice;
    }

    /// @dev Return listing price of the contract
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /// @dev Create NFT and list on the marketplace
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    /// @dev Create collection
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, unicode"Le prix doit être supérieur à 0");
        require(
            msg.value == listingPrice,
            unicode"Le prix doit être supérieur à la commission de la plateforme."
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        /// @dev transfer to contract
        _transfer(msg.sender, address(this), tokenId);

        emit idToMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /// @dev allows a purchase token to be resale
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            unicode"Vous n'êtes pas le owneriétaire de ce token"
        );

        require(
            msg.value == listingPrice,
            unicode"Le prix doit être égal au prix défini"
        );

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    /// @dev Create Item Market Sale and transfer ownership and funds
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;

        require(
            msg.value == price,
            unicode"Merci d'indiquer le prix demandé pour finaliser l'achat"
        );

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    /// @dev Get Unsold NFT Datas
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @dev Get only the NFTs of the user
    function fetchMyNFT() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount = i + 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @dev Returns item listed by user
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount = i + 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @dev GetNft by his TokenId
    function getListedTokenForId(uint256 tokenId)
        public
        view
        returns (MarketItem memory)
    {
        return idToMarketItem[tokenId];
    }
}
