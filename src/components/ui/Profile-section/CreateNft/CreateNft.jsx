import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import NftCard from '../../Nft-card/NftCard';
import './create-nft.css';
import img from '../../../../assets/nfts/img-04.jpg';
import avatar from '../../../../assets/images/ava-04.png';
import UploadNft from './UploadNft';

const item = {
    id: "04",
    title: "Original painting",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia incidunt quis tempora asperiores illum inventore at, porro unde, veritatis nihil possimus, eum modi pariatur corporis doloribus dolore. Inventore et porro tempora aut. Sint dolores quas quasi enim soluta itaque.",
    imgUrl: img,
    creator: "Steve Johnson",
    creatorImg: avatar,
    price: 78900
}

function CreateNft() {

    return <>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <div className="seller_section-title">
                            <h3>Créer un nouveau NFT</h3>
                        </div>
                    </Col>
                    <Col lg='3' md='4' sm='6'>
                        <h5 className='mb-4 text-dark'>Prévisualisation NFT</h5>
                        <NftCard item={item} />
                    </Col>
                    <Col lg='9' md='8' sm='6'>
                        <UploadNft />
                    </Col>
                </Row>
            </Container>
        </section>
    </>
};

export default CreateNft;