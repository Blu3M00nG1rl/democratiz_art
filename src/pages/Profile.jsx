import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Democratiz_ArtAddress, Democratiz_ArtABI } from '../context/constants.js';
import CommonSection from '../components/ui/Common-section/CommonSection';
import RegisterAdmin from '../components/ui/Profile-section/RegisterAdmin';
import RegisterArtists from '../components/ui/Profile-section/RegisterArtists';
import CreateNft from '../components/ui/Profile-section/CreateNft/CreateNft';

function Profile() {

    const [statutProfile, setStatutProfile] = useState("Profil Utilisateur");

    useEffect(() => {
        detectProfile();
    }, [])

    //Recherche du profil du wallet
    async function detectProfile() {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(Democratiz_ArtAddress, Democratiz_ArtABI, signer);

        let propr = contract.owner();
        propr
            .then((data) => {
                const owner = data.toLowerCase();
                const wallet = accounts[0].toLowerCase();
                console.log("owner :" + owner);
                if (owner === wallet) {
                    setStatutProfile("Profil Super Administrateur");
                    console.log("Owner : true");
                } else { console.log("Owner : false"); }
                let admin = contract.adminRegistered(accounts[0]);
                admin
                    .then((data) => {
                        console.log("Admin : " + data);
                        if (data === true) {
                            setStatutProfile("Profil Administrateur");
                        }
                    })
                    .catch((err) => console.log("Erreur : " + err));
                let artist = contract.artistRegistered(accounts[0]);
                artist
                    .then((data) => {
                        console.log("Artiste : " + data);
                        if (data === true) {
                            setStatutProfile("Profil Artiste");
                        }
                    })
                    .catch((err) => console.log("Erreur : " + err));
            })
            .catch((err) => console.log("Erreur : " + err));
    }

    //Block affiché en fonction du profil
    function profileBlock() {
        if (statutProfile === "Profil Artiste") {
            return <>
                <CreateNft />
            </>
        }
        if (statutProfile === "Profil Administrateur") {
            return <>
                <RegisterArtists />
            </>
        }
        if (statutProfile === "Profil Super Administrateur") {
            return <>
                <RegisterAdmin />
            </>
        }
    }

    return <>
        <CommonSection title={statutProfile} />
        {profileBlock()}
    </>

};

export default Profile;