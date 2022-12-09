import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0x42B96354A72AcF425fD54A61710367aB0645b3e5
//Mumbai : 0x8F6fa783386d0b447a2CbCde213102Da4662dD76
//Goerli : 0x54C8FF4Ec74eEd4baB9B933F76099C210EB698a5

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0x42B96354A72AcF425fD54A61710367aB0645b3e5";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );

