// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

/// @title DemocratizArt Contract
/// @author Sophie Constantin
/// @notice Contract created for Alyra Final Project

/// @dev Import contracts from openzeppelin
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract DemocratizArt is Ownable {
    mapping(address => bool) private admin;
    mapping(address => bool) private artist;

    event AdminRegistered(address _address);
    event ArtistRegistered(address _address);

    function registerAdmin(address _address) public onlyOwner {
        require(!admin[_address], unicode"Cette personne est déjà admin.");
        admin[_address] = true;
        emit AdminRegistered(_address);
    }

    modifier onlyAdmin() {
        require(admin[msg.sender], unicode"Vous n'êtes pas administrateur");
        _;
    }

    function registerArtist(address _address) public onlyAdmin {
        require(!artist[_address], unicode"Artiste déjà enregistré.");
        artist[_address] = true;
        emit ArtistRegistered(_address);
    }

    modifier onlyArtist() {
        require(
            artist[msg.sender],
            unicode"Vous n'êtes pas inscrit en tant qu'artiste."
        );
        _;
    }
}
