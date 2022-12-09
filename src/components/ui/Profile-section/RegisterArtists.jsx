import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { fetchContract } from '../../../context/constants.js';
import { Col, Container, Row, Table } from 'reactstrap';
import './profile.css';

const RegisterArtists = () => {

    const [artistAddress, setArtistAddress] = useState();
    const [artistsList, setArtistsList] = useState([]);

    useEffect(() => {
        fetchArtist();
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function setArtist() {
        if (!artistAddress) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            await contract.registerArtist(artistAddress);
            setArtistAddress('');
        }
    }

    async function fetchArtist() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const filter = contract.filters.ArtistRegistered(null);
            let allEvents = await contract.queryFilter(filter, 0, "latest");
            let listArtists = [];
            allEvents.forEach(event => {
                listArtists.push(event.args._address);
            });
            setArtistsList(listArtists);
        }
    }

    return <>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <section className='common_section'>
                            <Container className='text-center'><h1>PROFIL ADMINISTRATEUR</h1></Container>
                        </section>
                        <div className="seller_section-title">
                            <h3>Enregistrement des Artistes sur la Plateforme.</h3>
                        </div>
                        <div className="content">
                            <p>Liste blanche des artistes autorisés à utiliser la plateforme (identifiés par leur adresse Ethereum).</p>
                        </div>
                        <div className="btns d-flex align-items-center gap-4">
                            <input className="input_zone" onChange={e => setArtistAddress(e.target.value)} placeholder="Adresse de l'Artiste" />
                            <button onClick={setArtist} className='btn_ajout d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i>Autoriser</button>
                        </div>
                        <div className="content_data">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Liste des Artistes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artistsList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
};

export default RegisterArtists;