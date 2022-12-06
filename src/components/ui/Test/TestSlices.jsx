import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "./test.css";
import testImg from '../../../assets/nfts/img-01.jpg';

const TestSlices = () => {
    var imageToSlices = require('image-to-slices');

    var lineXArray = [100, 200];
    var lineYArray = [100, 200];
    var source = { testImg }; // width: 300, height: 300

    imageToSlices(source, lineXArray, lineYArray, {
        saveToDir: '../../../assets/nfts_slices/'
    }, function () {
        console.log('the source image has been sliced into 9 sections!');
    });

    return <section className='test_section'>
        <Container>
            <Row>
                <Col lg='12' md='12'>
                    <div className="puzzle piece1"></div>
                    <div>sophie</div>
                    <div className="puzzle piece2"></div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default TestSlices;