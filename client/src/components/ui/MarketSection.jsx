import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "./market-section.css";

import heroImg from '../../assets/images/hero.jpg';

const HeroSection = () => {
    return <section className="hero_section">
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className="hero_content">
                        <h2>Place de<span> Marché</span></h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente quos totam soluta doloribus doloremque architecto natus ut sed modi ea.</p>
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