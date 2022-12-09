import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import './step-section.css';

const STEP_DATA = [
    {
        title: "DEVENEZ ARTISTE SUR LE PLATEFORME",
        desc: "Remplissez le formulaire d’inscription Artiste afin de pouvoir être référencé sur la plateforme.",
        desc2: "Une adresse Ethereum est nécessaire pour vous inscrire.",
        icon: 'ri-number-1',
        url: './artist'
    },

    {
        title: 'CREEZ UNE OEUVRE DIGITALE',
        desc: 'Une fois référencé sur la plateforme, vous serez en capacité de créer une représentation digitale (collection) de vos oeuvres physiques sous forme de NFTs en quelques clics.',
        desc2: "Créez votre propre stratégie de tokenisation (prix, nombre de NFTs, frais de créateur).",
        icon: 'ri-number-2',
        url: './create'
    },

    {
        title: 'CREEZ VOS NFT',
        desc: 'Chaque oeuvre mise en vente sur la plateforme sera étudiée puis validée par notre équipe afin d’assurer la bonne complétion et qualité des informations requises.',
        desc2: "Une fois validée, vous pourrez en un clic créer votre collection et les NFTs associés.",
        icon: 'ri-number-3',
        url: './create'
    },

    {
        title: 'VENDEZ VOS NFT',
        desc: 'Une fois créés, vos NFTs seront automatiquement mis en vente sur la marketplace.',
        desc2: "Vous recevrez une alerte lorsque l’un de vos NFTs aura été vendu.",
        icon: 'ri-number-4',
        url: './market'
    },
]

function StepSection() {
    return <section className='step_section'>
        <Container>
            <Row>
                <Col lg='12' className='mb-4'>
                    <h3 className="step_title">Comment ça marche ?</h3>
                </Col>

                {STEP_DATA.map((item, index) => (
                    <Col lg='3' md='4' sm='6' key={index} className='mb-4'>
                        <div className="single_step_item">
                            <div className="step_item_content d-flex gap-2 align-items-center'">
                                <span><i className={item.icon}></i></span>
                                <h5>
                                    <Link to={item.url}>{item.title}</Link>
                                </h5>
                            </div>
                            <div>
                                <div className='step_item_desc mb-0'>
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    </Col>))}


            </Row>
        </Container>
    </section>
};

export default StepSection;