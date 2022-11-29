import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./hero-section.css";

import heroImg from '../../assets/images/hero.jpg';

const HeroSection = () => {
    return <section className="hero_section">
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className="hero_content">
                        <h2>Achetez des
                            <span> NFTs </span> dérivés des oeuvres physiques d’artistes contemporains.</h2>
                        <p>Collectionnez et soutenez des artistes contemporains en achetant des fractions de leurs oeuvres physiques via des NFTs.</p>
                        <div className="hero_btns d-flex align-items-center gap-4">
                            <button className='explore_btn d-flex align-items-center gap-2'><i className="ri-rocket-line"></i><Link to="/market">Market Place</Link></button>
                        </div>
                    </div>
                </Col>

                <Col lg='6' md='6'>
                    <div className="hero_img">
                        <img src={heroImg} alt="" className='w-100' />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default HeroSection;