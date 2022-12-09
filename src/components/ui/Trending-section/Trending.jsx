import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { fetchContract } from '../../../context/constants.js';
import axios from "axios";
import { ethers } from "ethers";
import NftCard from '../Nft-card/NftCard';
import './trending.css';

const Trending = () => {

    const [listNfts, setListNfts] = useState([]);

    //Fetch NFTs
    async function fetchNFTs() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();
            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, propr, price: unformattedPrice }) => {
                        const tokenURI = await contract.tokenURI(tokenId);
                        const {
                            data: { image, name, description },
                        } = await axios.get(tokenURI);
                        const price = ethers.utils.formatUnits(
                            unformattedPrice.toString(),
                            "ether"
                        );

                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            propr,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                    }
                )
            );
            return items
        } catch (error) {
            alert("Erreur au chargement des NFTS");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNFTs().then((items) => {
            setListNfts(items.reverse());
            console.log(items.reverse());
        });
    }, []);

    return <section className='trending_section'>
        <Container>
            <Row>
                <Col lg='12' className='trending_section-title mb-5'>
                    <h3 className="trending title">TOP COLLECTIONS</h3>
                </Col>
                <Row className="d-flex align-items-center">
                    {listNfts.length === 0 ? "Chargement en cours" : <NftCard NFTData={listNfts} />}
                </Row>
            </Row>
        </Container>
    </section>
};

export default Trending;