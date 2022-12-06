import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const WalletCardEthers = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { provider: ethereum } = provider;
    const [currentAccount, setCurrentAccount] = useState("");


    //Vérifie si le wallet est connecté
    async function checkIfWalletConnected() {
        try {
            if (!window.ethereum)
                return console.log("Installez MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("compte : " + accounts[0]);
            } else {
                console.log("Aucun compte trouvé");
                console.log(true);
            }


        } catch (error) {
            console.log("Erreur de connexion au wallet");
        }
    };

    useEffect(() => {
        ethereum?.on("accountsChanged", checkIfWalletConnected);
        return () => {
            ethereum?.removeListener("accountsChanged", checkIfWalletConnected);
        };
    });



    return (
        <div className='walletCard'>
            <h4> Connection to MetaMask using ethers.js </h4>
            <div className='accountDisplay'>
                <h3>Address: {currentAccount}</h3>
            </div>
        </div>
    );
}

export default WalletCardEthers;