import React from 'react';
import { Link } from 'react-router-dom';
import creatorImg from '../../../assets/images/profile.png';
import './nft-card.css';
import { Col } from 'reactstrap';

function NftCard(NFTData) {

    return <>
        {NFTData.NFTData.map((el, i) => (
            <Col lg="3" md='4' sm='6' className='mb-4' key={el.tokenId}>

                <div className="single_nft_card" >
                    <Link to={`/market/${el.tokenId}`}>
                        <div className="nft_img" >
                            <img src={"https://gateway.pinata.cloud/ipfs/" + el.image} alt="" />
                        </div>
                    </Link>
                    <div className="nft_content">
                        <h5 className='nft_title'>{el.name}</h5>

                        <div className="creator_info-wrapper d-flex gap-3">
                            <div className="creator_img">
                                <img src={creatorImg} alt="" className='w-100' />
                            </div>

                            <div className='creator_info w-100 d-flex align-items-center justify-content-between'>
                                <div>
                                    <h6>Vendeur</h6>
                                    <p>{el.seller.substring(0, 6) + ".." + el.seller.substring(el.seller.length - 6)}</p>
                                </div>

                                <div>
                                    <h6>Prix</h6>
                                    <p>{el.price} MATIC</p>
                                </div>
                            </div>
                        </div>
                        <Link to={`/market/${el.tokenId}`}>
                            <div className='mt-3 d-flex align-item-center justify-content-between'>
                                <button className="buy_btn d-flex align-items-center gap-1">
                                    <i className="ri-file-list-3-line"></i>Detail
                                </button>
                                <span className='history_link'>Voir l'Historique</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </Col>
        ))}
    </>
};

export default NftCard;