

import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./trending-art.css";

import NftCard from '../Nft-card/NftCard';
import { NFT_DATA } from '../../../assets/data/data.js';

const TrendingArt = () => {
    return <section className="trending_section">
        <Container>
            <Row>
                <Col lg="12" className='mb-5'>
                    <div className="trending_auction_top d-flex align-items-center justify-content-between">
                        <h3>Oeuvres Populaires</h3>
                        <span><Link to="/market">Explorer plus</Link></span>
                    </div>
                </Col>


                {NFT_DATA.slice(0, 4).map((item) => (
                    <Col lg="3">
                        <NftCard key={item.id} item={item} />
                    </Col>
                ))}
            </Row>
        </Container>
    </section>
};

export default TrendingArt;