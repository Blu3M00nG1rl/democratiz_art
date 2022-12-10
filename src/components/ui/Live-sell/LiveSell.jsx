
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import "./live-sell.css";
import NftCard from '../Nft-card/NftCard';
import { fetchContract } from '../../../context/constants.js';
import axios from "axios";
import { ethers } from "ethers";

const LiveSell = () => {

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
            //console.log("name : ", items[0].name);
            return items
        } catch (error) {
            alert("Erreur au chargement des NFTS");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNFTs().then((items) => {
            setListNfts(items.reverse());
        });
    }, []);

    return <section className="live_section">
        <Container>
            <Row>
                <Col lg="12" className='mb-5'>
                    <div className="live_auction_top d-flex align-items-center justify-content-between">
                        <h3>VENTES EN COURS</h3>
                        <span><Link to="/market">Voir toutes les oeuvres en vente</Link></span>
                    </div>
                </Col>

                <Row className="d-flex align-items-center">
                    {listNfts.length === 0 ? "Aucune Oeuvre en vente" : <NftCard NFTData={listNfts} />}
                </Row>
            </Row>
        </Container>
    </section>
};

export default LiveSell;