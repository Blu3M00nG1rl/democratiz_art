import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./top-section.css";

import topImg from '../../../assets/images/artists.jpg';

const topSection = () => {
    return <section className="top_section">
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className="top_content">
                        <h2>DONNER UNE
                            <span> VIE DIGITALE </span>A VOS OEUVRES PHYSIQUES.</h2>
                        <p>On vous accompagne dans le processus de représentation numérique de vos oeuvres physiques. Nous utilisons les capacités de la blockchain Polygon pour rendre l’ART et les créations physiques accessible au grand public à travers la création de NFTs et la tokenisation de vos oeuvres.</p>
                        <div className="top_btns d-flex align-items-center gap-4">
                            <button className='join_btn d-flex gap-2 align-items-center'>
                                <span>
                                    <i className="ri-global-line"></i>
                                </span>
                                <Link to='/#'>
                                    Rejoignez Nous
                                </Link>
                            </button>     </div>
                    </div>
                </Col>

                <Col lg='6' md='6'>
                    <div className="top_img">
                        <img src={topImg} alt="" className='w-100' />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default topSection;