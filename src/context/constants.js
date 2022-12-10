import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0x1A8141567Eed7F996FE6A09AE3C639e4E952056E
//Mumbai : 0x8F6fa783386d0b447a2CbCde213102Da4662dD76
//Goerli : 0x54C8FF4Ec74eEd4baB9B933F76099C210EB698a5

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0x8F6fa783386d0b447a2CbCde213102Da4662dD76";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );


