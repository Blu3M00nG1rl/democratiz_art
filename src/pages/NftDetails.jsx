import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import LiveSell from '../components/ui/Live-sell/LiveSell';
import { fetchContract } from '../context/constants.js';
import { ethers } from "ethers";
import axios from "axios";
import '../styles/nft-details.css';
import creatorImg from '../assets/images/profile.png';
//import ImgTemp from '../assets/images/nft-logo.png';

function NftDetails(props) {
    const { tokenId } = useParams();
    const [nft, setNft] = useState({});
    const [nftSellerAbreg, setNftSellerAbreg] = useState("");
    const [nftSellerToLowerCase, setNftSellerToLowerCase] = useState("");
    const [nftOwnerToLowerCase, setNftOwnerToLowerCase] = useState("");
    const [nftOwnerAbreg, setNftOwnerAbreg] = useState("");
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

    //Get NFT Data
    const getNFTData = useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
            type: meta.type,
            year: meta.year,
            long: meta.long,
            larg: meta.larg,
            numbNFTs: meta.numbNfts,
            royalties: meta.royalties
        }
        setNft(item);
        setNftSellerAbreg(item.seller.substring(0, 6) + "..." + item.seller.substring(item.seller.length - 6));
        setNftSellerToLowerCase(item.seller.toLowerCase());
        setNftOwnerAbreg(item.owner.substring(0, 6) + "..." + item.owner.substring(item.owner.length - 6));
        setNftOwnerToLowerCase(item.owner.toLowerCase());
        console.log(item);
    }, [tokenId]) // if tokenId changes, useEffect will run again

    //BUY NFT
    async function buyNFT(tokenId) {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });
            await transaction.wait();
            window.location.href = '/profile'
        } catch (error) {
            alert("Erreur de la transaction d'achat : ", error);
        }
    };

    async function resellToken(tokenId) {
        window.location.href = '/resell/tokenId'
    };

    //Watch if wallet connected
    useEffect(() => {
        checkIfWalletConnected();
    });



    useEffect(() => {
        getNFTData()
    }, [getNFTData])


    return (
        <>
            <section className='nftDetails_section'>
                <Container>
                    <Row>
                        <Col lg='6' md='6' sm='6'>
                            <img src={"https://gateway.pinata.cloud/ipfs/" + nft.image}
                                alt=''
                                className='w-100 single_nft-img'
                            />
                        </Col>

                        <Col lg='6' md='6' sm='6'>
                            <div className="single_nft_content">
                                <h2>{nft.name}</h2>
                                <div className='d-flex align-items-center justify-content-between mt-4 mb-4'>
                                    <div className='d-flex align-items-center gap-4 single_nft-seen'>
                                        <span>
                                            <i className='ri-eye-line'></i> 234
                                        </span>
                                        <span>
                                            <i className='ri-heart-line'></i> 123
                                        </span>
                                    </div>

                                    <div className='d-flex align-items-center gap-2 single_nft-more'>
                                        <span>
                                            <i className='ri-send-plane-line'></i>
                                        </span>
                                        <span>
                                            <i className='ri-more-2-line'></i>
                                        </span>
                                    </div>
                                </div>

                                <div className="nft_creator mb-4">
                                    <div className="artist_img d-flex align-items-center justify-content-between">
                                        <img src={creatorImg} alt="" className='w-100' />
                                        <div className="artist_detail">
                                            Propriétaire <h6>{nftOwnerAbreg}</h6>
                                        </div>
                                        <div className="artist_detail">
                                            Vendeur <h6>{nftSellerAbreg}</h6>
                                        </div>
                                    </div></div>

                                <div className="nft_caract mb-4 d-flex">
                                    <div className="artist_detail">
                                        Type <h6>{nft.type}</h6>
                                    </div>
                                    <div className="artist_detail">
                                        Année <h6>{nft.year}</h6>
                                    </div>
                                    <div className="artist_detail">
                                        Format en cm <h6>{nft.long} x {nft.larg}</h6>
                                    </div>
                                </div>

                                <div className="nft_token mb-4 d-flex">
                                    <div className="artist_detail">
                                        Nombre de NFTs <h6>{nft.numbNFTs}</h6>
                                    </div>
                                    <div className="artist_detail">
                                        Prix <h6>{nft.price} MATIC</h6>
                                    </div>
                                </div>

                                <p className='my-4'>{nft.description}</p>
                                {currentAccount === nftSellerToLowerCase ?
                                    (<p className='message_alert'>Vous êtes le vendeur de ce NFT</p>)
                                    : currentAccount === nftOwnerToLowerCase ? (
                                        <button onClick={() => resellToken(nft.tokenId)} className='singleNft-btn d-flex align-items-center gap-2 w-50'>
                                            <i className='ri-shopping-bag-line'></i>
                                            <Link to=''>Revendre sur la Marketplace</Link>
                                        </button>)
                                        : (
                                            <button onClick={() => buyNFT(nft.tokenId)} className='singleNft-btn d-flex align-items-center gap-2 w-50'>
                                                <i className='ri-shopping-bag-line'></i>
                                                <Link to=''>Acheter</Link>
                                            </button>)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <LiveSell />
        </>
    );
};

export default NftDetails; 