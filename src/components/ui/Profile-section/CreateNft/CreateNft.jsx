import React from 'react';
import { Container, Row } from 'reactstrap';
import './create-nft.css';
import UploadNft from './UploadNft';

function CreateNft() {

    return <>
        <section>
            <Container>
                <Row>
                    <div className="seller_section-title">
                        <h3>Créer un nouveau NFT</h3>
                    </div>
                    <UploadNft />
                </Row>
            </Container>
        </section>
    </>
};

export default CreateNft;