import React from 'react';

import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { NFT_DATA } from '../assets/data/data';
import LiveSell from '../components/ui/Live-sell/LiveSell';



import '../styles/nft-details.css';

const NftDetails = () => {
    const { id } = useParams()

    const singleNft = NFT_DATA.find(item => item.id === id)

    return (
        <>

            <section className='nftDetails_section'>
                <Container>
                    <Row>
                        <Col lg='6' md='6' sm='6'>
                            <img src={singleNft.imgUrl}
                                alt=''
                                className='w-100 single_nft-img'
                            />
                        </Col>

                        <Col lg='6' md='6' sm='6'>
                            <div className="single_nft_content">
                                <h2>{singleNft.title}</h2>

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
                                        <img src={singleNft.creatorImg} alt="" className='w-100' />
                                    </div>

                                    <div className="artist_detail">
                                        <p>Créé par</p>
                                        <h6>{singleNft.creator}</h6>
                                    </div>
                                </div>

                                <p className='my-4'>{singleNft.desc}</p>
                                <button className='singleNft-btn d-flex align-items-center gap-2 w-100'>
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