import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import './step-section.css';

const STEP_DATA = [
    {
        title: "Inscrivez-vous sur DA",
        desc: "Remplissez le formulaire de demande d'inscription pour obtenir votre validation 'artiste' sur Democratiz_Art.",
        icon: 'ri-user-star-line',
        url: './artist'
    },

    {
        title: 'Créez votre collection',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum in, odio quasi numquam sit quisquam.',
        icon: 'ri-layout-masonry-line',
        url: './create'
    },

    {
        title: 'Ajoutez vos NFTs',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum in, odio quasi numquam sit quisquam.',
        icon: 'ri-image-line',
        url: './create'
    },

    {
        title: 'Mettez les en vente',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum in, odio quasi numquam sit quisquam.',
        icon: 'ri-list-check',
        url: './market'
    },
]

const StepSection = () => {
    return <section className='step_section'>
        <Container>
            <Row>
                <Col lg='12' className='mb-4'>
                    <h3 className="step_title">Rejoignez Democratiz_Art pour vendre vos oeuvres physiques sous forme de NFTs</h3>
                </Col>

                {STEP_DATA.map((item, index) => (
                    <Col lg='3' md='4' sm='6' key={index} className='mb-4'>
                        <div className="single_step_item">
                            <span><i className={item.icon}></i></span>
                            <div className="step_item_content">
                                <h5>
                                    <Link to={item.url}>{item.title}</Link>
                                </h5>
                                <p className='mb-0'>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    </Col>))}


            </Row>
        </Container>
    </section>
};

export default StepSection;