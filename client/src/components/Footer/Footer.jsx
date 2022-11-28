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
                <Col lg="3" md="6" sm="6" className='mb-4'>
                    <div className="logo">
                        <h2 className=' d-flex gap-2 align-items-center'>
                            ARTISTES, REJOIGNEZ NOTRE COMMUNAUTÉ
                        </h2>
                        <p>DEMOCRATIZ_ART est une plateforme ouverte à tous les artistes plasticiens professionnels ou en devenir.<br />
                            Nous vous aidons à digitaliser vos oeuvres physiques et les mettons en vente sous forme de NFT ouvrant des bénéfices uniques à leurs acquéreurs
                        </p>
                    </div>
                </Col>
                <Col lg="2" md="3" sm="6" className='mb-4'>
                    <h5>Mon Compte</h5>
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
                <Col lg="2" md="3" sm="6" className='mb-4'>
                    <h5>Ressources</h5>
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
                <Col lg="2" md="3" sm="6" className='mb-4'>
                    <h5>Entreprise</h5>
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
                <Col lg="3" md="6" sm="6" className='mb-4'>
                    <h5>Newsletter</h5>
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