import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0x4F3cD9Be481675DE678BF1404A2aC225597897af
//Mumbai : 0xBC114e0Bf71Cf024fDC78e089288B431be53e87A
//Goerli : 0xD564fA75Ec1e2fE39A60D7c3F5068Eb6D27F39B8

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0xD564fA75Ec1e2fE39A60D7c3F5068Eb6D27F39B8";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );


