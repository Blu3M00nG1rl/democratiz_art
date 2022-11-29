import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CommonSection from '../components/ui/Common-section/CommonSection';
import NftCard from '../components/ui/Nft-card/NftCard';
import { NFT_DATA } from '../assets/data/data.js';
import '../styles/market.css';

const Market = () => {

    const handleCategory = () => { };

    const handleSort = () => { };


    return <>
        <CommonSection title={'MarketPlace'} />

        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <div className="market_product_filter d-flex align-items-center justify-content-between">
                            <div className='filter_left d-flex align-items-center gap-5'>
                                <div className="all_category_filter">
                                    <select onChange={handleCategory}>
                                        <option>Toutes les catégories</option>
                                        <option value="peinture">Peinture</option>
                                        <option value="sculpture">Sculpture</option>
                                        <option value="dessin">Dessin</option>
                                        <option value="photo">Photo</option>
                                        <option value="top-collection">Top Collection</option>
                                    </select>
                                </div>

                                <div className="our_artists">
                                    <h6>Nos Artistes</h6>
                                </div>
                            </div>

                            <div className="filter_right">
                                <select onChange={handleSort}>
                                    <option>Trier par</option>
                                    <option value="high">Prix Décroissant</option>
                                    <option value="low">Prix Croissant</option>
                                </select>
                            </div>



                        </div>
                    </Col>
                    {NFT_DATA.map(item => (
                        <Col lg='3' md='4' sm='6' className='mb-4' key={item.id_}>
                            <NftCard item={item} />
                        </Col>
                    ))
                    }

                </Row>
            </Container>

        </section>
    </>
};

export default Market;