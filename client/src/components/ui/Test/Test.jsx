import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "./test.css";
import testImg from '../../../assets/nfts/img-01.jpg';

const Test = () => {

    return <section className='test_section'>
        <Container>
            <Row>
                <Col lg='12' md='12'>
                    <img src={testImg} alt="" style={{ resizeMode: 'stretch', width: 300, height: 337, top: 0, left: 0 }} />
                </Col>
            </Row>
        </Container>
    </section>
};

export default Test;