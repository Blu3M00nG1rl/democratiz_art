


import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./live-sell.css";

import NftCard from '../Nft-card/NftCard';
import { NFT_DATA } from '../../../assets/data/data.js';

const liveSell = () => {
    return <section className="live_section">
        <Container>
            <Row>
                <Col lg="12" className='mb-5'>
                    <div className="live_auction_top d-flex align-items-center justify-content-between">
                        <h3>Ventes en Cours</h3>
                        <span><Link to="/market">Voir toutes les oeuvres en vente</Link></span>
                    </div>
                </Col>


                {NFT_DATA.slice(0, 4).map((item) => (
                    <Col lg="3" md='4' sm='6' key={item.id} className='mb-4'>
                        <NftCard item={item} />
                    </Col>
                ))}
            </Row>
        </Container>
    </section>
};

export default liveSell;