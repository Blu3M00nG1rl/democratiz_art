import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Democratiz_ArtAddress, Democratiz_ArtABI } from '../context/constants.js';
import RegisterAdmin from '../components/ui/Profile-section/RegisterAdmin';
import RegisterArtists from '../components/ui/Profile-section/RegisterArtists';
import MyNFTs from '../components/ui/Profile-section/MyNFTs';
import CreateNft from '../components/ui/Profile-section/CreateNFT';
import { Col, Container, Row } from 'reactstrap';
import MySellNFTs from '../components/ui/Profile-section/MySellNFTs.jsx';

function Profile() {

    const [statutProfile, setStatutProfile] = useState("PROFIL AMATEUR D'ART");
    const [superAdminMenu, setSuperAdminMenu] = useState(false);
    const [adminMenu, setAdminMenu] = useState(false);
    const [createNftMenu, setCreateNftMenu] = useState(false);
    const [sellNFTsMenu, setSellNFTsMenu] = useState(false);
    const [myNFTsMenu, setMyNFTsMenu] = useState(true);


    function openMyNFTsMenu() {
        setMyNFTsMenu(true);
        setSellNFTsMenu(false);
        setCreateNftMenu(false);
        setAdminMenu(false);
        setSuperAdminMenu(false);
    };

    function openSellNFTsMenu() {
        setSellNFTsMenu(true);
        setMyNFTsMenu(false);
        setCreateNftMenu(false);
        setAdminMenu(false);
        setSuperAdminMenu(false);
    };

    function openCreateNftMenu() {
        setSellNFTsMenu(false);
        setMyNFTsMenu(false);
        setCreateNftMenu(true);
        setAdminMenu(false);
        setSuperAdminMenu(false);
    };

    function openAdminMenu() {
        setSellNFTsMenu(false);
        setMyNFTsMenu(false);
        setCreateNftMenu(false);
        setAdminMenu(true);
        setSuperAdminMenu(false);
    };

    function openSuperAdminMenu() {
        setSellNFTsMenu(false);
        setMyNFTsMenu(false);
        setCreateNftMenu(false);
        setAdminMenu(false);
        setSuperAdminMenu(true);
    };

    //Detect Profil Type of User
    async function detectProfile() {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(Democratiz_ArtAddress, Democratiz_ArtABI, signer);

        let superAdmin = contract.checkSuperAdmin();
        superAdmin
            .then((data) => {
                const superAdmin = data.toLowerCase();
                const wallet = accounts[0].toLowerCase();
                if (superAdmin === wallet) {
                    setStatutProfile("PROFIL SUPER ADMINISTRATEUR");
                    console.log("SuperAdmin : true");
                } else { console.log("SuperAdmin : false"); }
                let admin = contract.adminRegistered(accounts[0]);
                admin
                    .then((data) => {
                        console.log("Admin : " + data);
                        if (data === true) {
                            setStatutProfile("PROFIL ADMINISTRATEUR");
                        }
                    })
                    .catch((err) => console.log("Erreur : " + err));
                let artist = contract.artistRegistered(accounts[0]);
                artist
                    .then((data) => {
                        console.log("Artiste : " + data);
                        if (data === true) {
                            setStatutProfile("PROFIL ARTISTE");
                        }
                    })
                    .catch((err) => console.log("Erreur : " + err));
            })
            .catch((err) => console.log("Erreur : " + err));
    }

    useEffect(() => {
        detectProfile();
    }, []);

    return <>
        <section>
            <Container>
                <Row>
                    <section className='common_section'>
                        <Container className='text-center'><h1>{statutProfile}</h1></Container>
                    </section>


                    <Col lg='12' className='mb-5'>
                        <div className="market_product_filter d-flex align-items-center justify-content-between">
                            <div className='filter_left d-flex align-items-center gap-5'>
                                <div className="btn_global" onClick={() => openMyNFTsMenu()}>
                                    <h6>OEUVRES ACHETEES</h6>
                                </div>
                                {(statutProfile === "PROFIL ARTISTE" || statutProfile === "PROFIL ADMINISTRATEUR" || statutProfile === "PROFIL SUPER ADMINISTRATEUR") &&
                                    <>
                                        <div className="btn_global" onClick={() => openSellNFTsMenu()}>
                                            <h6>OEUVRES EN VENTE</h6>
                                        </div>
                                        <div className="btn_global" onClick={() => openCreateNftMenu()}>
                                            <h6>CREER UN NFT</h6>
                                        </div></>}
                                {statutProfile === "PROFIL ADMINISTRATEUR" &&
                                    <div className="btn_global" onClick={() => openAdminMenu()}>
                                        <h6>ADMINISTRATION</h6>
                                    </div>}
                                {statutProfile === "PROFIL SUPER ADMINISTRATEUR" &&
                                    <div className="btn_global" onClick={() => openSuperAdminMenu()}>
                                        <h6>ADMINISTRATION</h6>
                                    </div>}
                            </div>
                        </div>
                    </Col>
                    {superAdminMenu && <RegisterAdmin />}
                    {adminMenu && <RegisterArtists />}
                    {createNftMenu && <CreateNft />}
                    {sellNFTsMenu && <MySellNFTs />}
                    {myNFTsMenu && <MyNFTs />}
                </Row>
            </Container>
        </section>
    </>

};

export default Profile;