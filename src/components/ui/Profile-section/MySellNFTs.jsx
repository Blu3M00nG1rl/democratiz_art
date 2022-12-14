import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { fetchContract } from '../../../context/constants.js';
import './profile.css';
import { ethers } from "ethers";
import axios from "axios";
import { Link } from 'react-router-dom';
import creatorImg from '../../../assets/images/profile.png';
//import ImgTemp from '../../../assets/images/nft-logo.png';

function MySellNFTs() {

    const [listMySellNFTs, setListMySellNFTs] = useState([]);
    const [currentAccount, setCurrentAccount] = useState("");

    //Verify Wallet
    async function checkIfWalletConnected() {
        try {
            if (!window.ethereum)
                return alert("Installez MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                alert("Aucun compte trouvé");
            }
        } catch (error) {
            console.log("Erreur de connexion au wallet", error);
        }
    };

    // Connecting With Contract
    async function connectingWithSmartContract() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            return contract;
        } catch (error) {
            console.log("Erreur de connexion au contrat : ", error);
        }
    };

    //Fetch My NFTs
    const fetchMySellNFTs = useCallback(async () => {
        try {
            if (currentAccount) {

                const contract = await connectingWithSmartContract();
                const data = await contract.fetchItemsListed();
                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            console.log("tokenURI", tokenURI);
                            const {
                                data: { image, name, description, type, year, long, larg, numbNFTs, royalties },
                            } = await axios.get(tokenURI);
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                type,
                                year,
                                long,
                                larg,
                                numbNFTs,
                                royalties,
                                tokenURI
                            };
                        }
                    )
                );
                return setListMySellNFTs(items);
            }
        } catch (error) {
            console.log("Erreur de chargement des NFTs", error);
        }
    }, [currentAccount]);

    //Watch if wallet connected
    useEffect(() => {
        checkIfWalletConnected();
    });

    useEffect(() => {
        fetchMySellNFTs()

    }, [fetchMySellNFTs]);

    return <>
        <section>
            <Container>
                <Row className="d-flex align-items-center">
                    {listMySellNFTs.length === 0 ? "AUCUNE OEUVRE EN VENTE" :
                        listMySellNFTs.map((item, index) => (
                            <Col lg="3" md='4' sm='6' className='mb-4' key={index}>
                                <h5 className='nft_title'>{item.name}</h5>
                                <div className="single_nft_card" >
                                    <Link to={`/market/${item.tokenId}`}>
                                        <div className="nft_img" >
                                            <img src={"https://gateway.pinata.cloud/ipfs/" + item.image} alt="" />
                                        </div>
                                    </Link>
                                    <div className="nft_content">
                                        <h5 className='nft_title'>{item.name}</h5>

                                        <div className="creator_info-wrapper d-flex gap-3">
                                            <div className="creator_img">
                                                <img src={creatorImg} alt="" className='w-100' />
                                            </div>

                                            <div className='creator_info w-100 d-flex align-items-center justify-content-between'>
                                                <div>
                                                    <h6>Propriétaire</h6>
                                                    <p>{item.owner.substring(0, 6)}...{item.owner.substring(item.owner.length - 6)}</p>

                                                </div>

                                                <div>
                                                    <h6>Prix</h6>
                                                    <p>{item.price} MATIC</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Link to={`/market/${item.tokenId}`}>
                                            <div className='mt-3 d-flex align-item-center justify-content-between'>
                                                <button className="buy_btn d-flex align-items-center gap-1">
                                                    <i className="ri-file-list-3-line"></i>Detail
                                                </button>
                                                <span className='history_link'>Voir l'Historique</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </Col>))}
                </Row>

            </Container>
        </section>
    </>
};

export default MySellNFTs;