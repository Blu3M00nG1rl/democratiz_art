import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0xD75735dC6e650Bf2d8b2e1fb110FF5eF57E090BB
//Mumbai : 0xB130cBF6CE291A7b2903E59893da06defe48E33d
//Goerli : 0xBF63Ed941AB3E9f525Bd8C3025eFB54350a4C6d3

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0xBF63Ed941AB3E9f525Bd8C3025eFB54350a4C6d3";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );


