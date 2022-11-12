import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = () => {
    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="3" md="6" sm="6">
                    <div className="logo">
                        <h2 className=' d-flex gap-2 align-items-center'>
                            <span>
                                <i className="ri-artboard-fill"></i>
                            </span>
                            Democratiz Art
                        </h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis nemo laborum sit! Aperiam, quod mollitia. Dolorem tempora quaerat animi ab!</p>
                    </div>
                </Col>
                <Col lg="2" md="3" sm="6"></Col>
                <Col lg="2" md="3" sm="6"></Col>
                <Col lg="2" md="3" sm="6"></Col>
                <Col lg="3" md="6" sm="6"></Col>
            </Row>
        </Container>

    </footer>
};

export default Footer; 