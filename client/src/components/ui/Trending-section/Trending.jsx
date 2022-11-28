

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { NFT_DATA } from '../../../assets/data/data';
import NftCard from '../Nft-card/NftCard';

import './trending.css';

const Trending = () => {
    return <section className='trending_section'>
        <Container>
            <Row>
                <Col lg='12' className='trending_section-title mb-5'>
                    <h3 className="trending title">Top Collections</h3>
                </Col>

                {
                    NFT_DATA.slice(0, 8).map(item => (
                        <Col lg='3' md='4' sm='6' key={item.id} className='mb-4'>
                            <NftCard item={item} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    </section>
};

export default Trending;