import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./step-section.css";
import registerImg from '../../../assets/images/register.jpg';

function RegisterSection() {

    return <section className="top_section">
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <div className="top_content">
                        <h3>LE PROCESSUS DE SELECTION</h3>
                        <p>Nous avons conçu un formulaire qui nous permettra de valider votre présence en tant qu’artiste sur la plateforme. Il ne vous prendra que quelques minutes à compléter et consiste à vous présenter, vous, votre art et votre parcours en tant qu’artiste. </p>
                        <br /><br />
                        <p>Si vous n’arrivez pas à vous inscrire ou ne pouvez pas remplir toutes les informations nécessaires merci de nous adresser par email votre demande : <Link onClick={() => window.location = 'mailto:contact@democratizart.com'}>contact@democratizart.com</Link></p>
                        <div className="top_btns d-flex align-items-center gap-4">
                            <button onClick={() => window.location = 'https://docs.google.com/forms/d/e/1FAIpQLSehekEMHxtO1bsUW0zNlPjTwPavHqdXo9EDE_5hDowaAskslg/viewform'} className='join_btn d-flex gap-2 align-items-center'>
                                <i className="ri-registered-line"></i>S'inscrire
                            </button>
                        </div>
                    </div>
                </Col>

                <Col lg='6' md='6'>
                    <div className="top_img">
                        <img src={registerImg} alt="" className='w-100' />
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
}

export default RegisterSection;