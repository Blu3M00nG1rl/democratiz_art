import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import "./test.css";

const Test = () => {
    var imageToSlices = require('image-to-slices');

    var lineXArray = [100, 200];
    var lineYArray = [100, 200];
    var source = '/path/to/image.jpg'; // width: 300, height: 300

    imageToSlices(source, lineXArray, lineYArray, {
        saveToDir: '/path/to/'
    }, function () {
        console.log('the source image has been sliced into 9 sections!');
    });

    return <section className='test_section'>
        <Container>
            <Row>
                <Col lg='12' md='12'>
                    <div class="puzzle piece1"></div>
                    <div>sophie</div>
                    <div class="puzzle piece2"></div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Test;