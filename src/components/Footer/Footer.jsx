import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import './footer.css';

const MY_ACCOUNT = [
    {
        display: 'Profil',
        url: '#'
    },
    {
        display: 'Créer un NFT',
        url: '/create'
    },
    {
        display: 'Collections',
        url: '/market'
    },
    {
        display: 'Edition Profil',
        url: '#'
    }
]

const RESOURCES = [
    {
        display: "Centre d'Aide",
        url: '#'
    },
    {
        display: 'Partenaires',
        url: '#'
    },
    {
        display: 'Communautés',
        url: '#'
    },
    {
        display: 'Activité',
        url: '#'
    }
]

const COMPANY = [
    {
        display: 'A propos',
        url: '#'
    },
    {
        display: 'Emploi',
        url: '#'
    },
    {
        display: 'Investissement',
        url: '#'
    },
    {
        display: 'Contactez Nous',
        url: '/contact'
    }
]

const Footer = () => {
    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="12" md="12" sm="12" className='foot_tb mb-4 text-center'>
                    <h2>
                        VOUS ÊTES UN ARTISTE ?  REJOIGNEZ NOTRE COMMUNAUTÉ
                    </h2>
                    <p>DEMOCRATIZ_ART est une plateforme ouverte à tous les artistes plasticiens professionnels ou en devenir.
                        Nous vous aidons à digitaliser et fractionner vos oeuvres physiques pour les rendre accessibles à tous. Nous les mettons en vente sous forme de NFT ouvrant des bénéfices uniques à leurs acquéreurs.
                    </p>

                    <button onClick={() => window.location = 'https://docs.google.com/forms/d/e/1FAIpQLSehekEMHxtO1bsUW0zNlPjTwPavHqdXo9EDE_5hDowaAskslg/viewform'} className='btn d-flex gap-2 align-items-center'>
                        <i className="ri-registered-line"></i>Rejoignez Nous
                    </button>

                </Col>
                <Col lg="3" md="4" sm="6" className='foot_refs mb-4'>
                    <h5>MON COMPTE</h5>
                    <ListGroup className='list_group'>
                        {
                            MY_ACCOUNT.map((item, index) => (
                                <ListGroupItem key={index} className='list_item'>
                                    <Link to={item.url}> {item.display} </Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg="3" md="4" sm="6" className='foot_refs mb-4'>
                    <h5>RESSOURCES</h5>
                    <ListGroup className='list_group'>
                        {
                            RESOURCES.map((item, index) => (
                                <ListGroupItem key={index} className='list_item'>
                                    <Link to={item.url}> {item.display} </Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg="3" md="4" sm="6" className='foot_refs mb-4'>
                    <h5>ENTREPRISE</h5>
                    <ListGroup className='list_group'>
                        {
                            COMPANY.map((item, index) => (
                                <ListGroupItem key={index} className='list_item'>
                                    <Link to={item.url}> {item.display} </Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </Col>
                <Col lg="3" md="4" sm="6" className='foot_refs mb-4'>
                    <h5>NEWSLETTER</h5>
                    <input type="text" className="newsletter" placeholder='Email' />
                    <div className="social_links d-flex gap-3 align-items-center">
                        <span><Link to='#'><i className="ri-facebook-line"></i></Link></span>
                        <span><Link to='#'><i className="ri-instagram-line"></i></Link></span>
                        <span><Link to='#'><i className="ri-twitter-line"></i></Link></span>
                        <span><Link to='#'><i className="ri-telegram-line"></i></Link></span>
                        <span><Link to='#'><i className="ri-discord-line"></i></Link></span>
                    </div>
                </Col>

                <Col lg="12" className=' mt-4 text-center'>
                    <p className='copyright'> Copyrights 2022, Developpé par Sophie Constantin. </p>
                </Col>
            </Row>
        </Container>

    </footer>
};

export default Footer; 