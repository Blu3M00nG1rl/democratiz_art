import Democratiz_Art from "../artifacts/contracts/Democratiz_Art.sol/Democratiz_Art.json";
import { ethers } from "ethers";
//Localhost : 0x69F7eEB9ddE4A581CBF37b2A8570736EC8B7a3d5
//Mumbai : 0x9253A9384B7e46F2350c3518217de4691414AF33
//Goerli : 0x54C8FF4Ec74eEd4baB9B933F76099C210EB698a5

//Contract Address and ABI
export const Democratiz_ArtAddress =
    "0x9253A9384B7e46F2350c3518217de4691414AF33";
export const Democratiz_ArtABI = Democratiz_Art.abi;

//Fetching Smart Contract
export const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        Democratiz_ArtAddress,
        Democratiz_ArtABI,
        signerOrProvider
    );

