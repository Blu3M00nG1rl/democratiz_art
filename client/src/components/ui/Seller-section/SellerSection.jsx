import React from 'react';
import './seller.css';
import { Container, Row, Col } from 'reactstrap'
import { SELLER_DATA } from '../../../assets/data/data';

const SellerSection = () => {
    return <section className="seller_section">
        <Container>
            <Row>
                <Col lg='12' className='mb-5'>
                    <div className="seller_section-title">
                        <h3>Nos Artistes Ambassadeurs</h3>
                    </div>
                </Col>

                {
                    SELLER_DATA.slice(0, 4).map((item) => (
                        <Col lg='3' md='4' sm='4' xs='6' key={item.id} className='mb-4'>
                            <div className="single_seller-card">
                                <div className="seller_img">
                                    <img src={item.sellerImg} alt="" className='w-100' />
                                </div>

                                <div className="seller_content">
                                    <h6>{item.sellerName}</h6>
                                    <h6>{item.price} MATIC</h6>
                                </div>
                            </div>
                        </Col>
                    )
                    )}


            </Row>
        </Container>
    </section>
};

export default SellerSection;