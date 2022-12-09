import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import NftCard from '../Nft-card/NftCard';
import { fetchContract } from '../../../context/constants.js';
import './market-section.css';
import axios from "axios";
import { ethers } from "ethers";

function MarketSection() {

    const [listNfts, setListNfts] = useState([]);

    //Fetch NFTs
    async function fetchNFTs() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();
            console.log(data);
            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, propr, price: unformattedPrice }) => {
                        const tokenURI = await contract.tokenURI(tokenId);
                        console.log(tokenURI);
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
            console.log(items.reverse());
        });
    }, []);

    return <>
        <section>
            <Container>
                <Row>
                    <section className='common_section'>
                        <Container className='text-center'><h1>MARKET PLACE</h1></Container>
                    </section>
                    <Col lg='12' className='mb-5'>
                        <div className="market_product_filter d-flex align-items-center justify-content-between">
                            <div className='filter_left d-flex align-items-center gap-5'>
                                <div className="all_category_filter">
                                    <select>
                                        <option>TOUTES CATEGORIES</option>
                                        <option value="peinture">PEINTURE</option>
                                        <option value="sculpture">SCULPTURE</option>
                                        <option value="dessin">DESSIN</option>
                                        <option value="photo">PHOTO</option>
                                    </select>
                                </div>

                                <div className="top_collection">
                                    <h6>TOP COLLECTIONS</h6>
                                </div>

                                <div className="our_artists">
                                    <h6>NOS ARTISTES</h6>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Row className="d-flex align-items-center">
                        {listNfts.length === 0 ? "Chargement en cours" : <NftCard NFTData={listNfts} />}
                    </Row>

                </Row>
            </Container>

        </section>
    </>
};

export default MarketSection;