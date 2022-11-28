import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';

import './nft-card.css';

const NftCard = (props) => {

    const { title, id, price, creatorImg, imgUrl, creator } = props.item

    const [showModal, setShowModal] = useState(false);

    return <div className="single_nft_card">
        <div className="nft_img">
            <img src={imgUrl} alt="" />
        </div>

        <div className="nft_content">
            <h5 className='nft_title'><Link to={`/market/${id}`}>{title}</Link></h5>

            <div className="creator_info-wrapper d-flex gap-3">
                <div className="creator_img">
                    <img src={creatorImg} alt="" className='w-100' />
                </div>

                <div className='creator_info w-100 d-flex align-items-center justify-content-between'>
                    <div>
                        <h6>Créé Par</h6>
                        <p>{creator}</p>
                    </div>

                    <div>
                        <h6>Prix actuel</h6>
                        <p>{price} MATIC</p>
                    </div>
                </div>
            </div>

            <div className='mt-3 d-flex align-item-center justify-content-between'>
                <button className="buy_btn d-flex align-items-center gap-1" onClick={() => setShowModal(true)}>
                    <i className="ri-shopping-bag-line"></i>Acheter
                </button>


                {showModal && <Modal setShowModal={setShowModal} />}

                <span className='history_link'><Link to="#">Voir l'Historique</Link></span>
            </div>

        </div>
    </div>
};

export default NftCard;