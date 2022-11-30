import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CommonSection from '../components/ui/Common-section/CommonSection'
import NftCard from '../components/ui/Nft-card/NftCard';
import img from '../assets/nfts/img-01.jpg';
import avatar from '../assets/images/av01.jpg';

import '../styles/create-item.css';

const item = {
    id: "04",
    title: "Original painting",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia incidunt quis tempora asperiores illum inventore at, porro unde, veritatis nihil possimus, eum modi pariatur corporis doloribus dolore. Inventore et porro tempora aut. Sint dolores quas quasi enim soluta itaque.",
    imgUrl: img,
    creator: "Steve Johnson",
    creatorImg: avatar,
    price: 78900
}

const Profil = () => {
    return <>
        <CommonSection title='Créer un NFT' />

        <section>
            <Container>
                <Row>
                    <Col lg='3' md='4' sm='6'>
                        <h5 className='mb-4 text-dark'>Prévisualisation NFT</h5>
                        <NftCard item={item} />
                    </Col>

                    <Col lg='9' md='8' sm='6'>
                        <div className="create_item">
                            <form>
                                <div className="form_input w-50">
                                    <label htmlFor="">Télécharger fichier</label>
                                    <input type="file" className="upload_input" />
                                </div>

                                <div className="form_input w-50">
                                    <label htmlFor="">Prix</label>
                                    <input type="number" placeholder="Entrez le prix de l'article (MATIC)" />
                                </div>

                                <div className="form_input">
                                    <label htmlFor="">Titre</label>
                                    <input type="text" placeholder="Entrez un titre" />
                                </div>

                                <div className="form_input">
                                    <label htmlFor="">Description</label>
                                    <textarea
                                        name=""
                                        id=""
                                        rows="7"
                                        placeholder='Entrez une description'
                                        className='w-100'>
                                    </textarea>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
};

export default Profil;