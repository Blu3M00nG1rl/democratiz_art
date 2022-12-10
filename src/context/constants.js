import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0x1A8141567Eed7F996FE6A09AE3C639e4E952056E
//Mumbai : 0x8F6fa783386d0b447a2CbCde213102Da4662dD76
//Goerli : 0x9C0edD951412d700b741BfeDE29916C2D93bD3A4

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0x9C0edD951412d700b741BfeDE29916C2D93bD3A4";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );


