import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import LiveSell from '../components/ui/Live-sell/LiveSell';
import { fetchContract } from '../context/constants.js';
import { ethers } from "ethers";
import axios from "axios";
import '../styles/nft-details.css';
import creatorImg from '../assets/images/profile.png';
import testImage from '../assets/nfts/img-01.jpg';

function NftDetails(props) {
    const { tokenId } = useParams();
    const [nft, setNft] = useState({});
    const [nftSellerAbreg, setNftSellerAbreg] = useState("");

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
            propr: listedToken.propr,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        setNft(item);
        setNftSellerAbreg(item.seller.substring(0, 6) + "......" + item.seller.substring(item.seller.length - 6))
        console.log(item);
    }, [tokenId]) // if tokenId changes, useEffect will run again

    useEffect(() => {
        getNFTData()
    }, [getNFTData])


    return (
        <>
            <section className='nftDetails_section'>
                <Container>
                    <Row>
                        <Col lg='6' md='6' sm='6'>
                            <img src={testImage}
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

                                <div className="nft_creator d-flex gap-3 align-items-center">
                                    <div className="artist_img">
                                        <img src={creatorImg} alt="" className='w-100' />
                                    </div>

                                    <div className="artist_detail">
                                        <p>Créé par</p>
                                        <h6>{nftSellerAbreg}</h6>
                                    </div>
                                </div>

                                <p className='my-4'>{nft.description}</p>
                                <button className='singleNft-btn d-flex align-items-center gap-2 w-50'>
                                    <i className='ri-shopping-bag-line'></i>
                                    <Link to='/wallet'>Acheter</Link>
                                </button>
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