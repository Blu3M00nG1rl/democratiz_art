import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const StepSection = () => {
    return <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-4'>
                    <h3 className="step_title">Créez et Vendez vos NFTs</h3>
                </Col>

                <Col lg='3'>
                    <div className="single_step_item">
                        <span><i class="ri-wallet-line"></i></span>
                        <div className="step_item_content">
                            <h5>
                                <Link to="/wallet">Connectez votre wallet</Link>
                            </h5>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, blanditiis minima quaerat quo accusamus itaque?</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default StepSection;