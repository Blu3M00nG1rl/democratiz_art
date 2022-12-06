import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Democratiz_ArtAddress, Democratiz_ArtABI } from '../../../context/constants';
import { Col, Container, Row, Table } from 'reactstrap';
import './register.css';


const RegisterAdmin = () => {

    const [adminAddress, setAdminAddress] = useState();
    const [adminsList, setAdminsList] = useState([]);

    useEffect(() => {
        fetchAdmin();
    }, [])

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function setAdmin() {
        if (!adminAddress) return
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Democratiz_ArtAddress, Democratiz_ArtABI, signer);
            await contract.registerAdmin(adminAddress);
            setAdminAddress('');
        }
    }

    async function fetchAdmin() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(Democratiz_ArtAddress, Democratiz_ArtABI, signer);
            const filter = contract.filters.AdminRegistered(null);
            let allEvents = await contract.queryFilter(filter, 0, "latest");
            let listAdmins = [];
            allEvents.forEach(event => {
                listAdmins.push(event.args._address);
            });
            setAdminsList(listAdmins);
        }
    }

    return <>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <div className="seller_section-title">
                            <h3>Enregistrement des Administrateurs de la Plateforme.</h3>
                        </div>
                        <div className="content">
                            <p>Liste blanche des administrateurs identifiés par leur adresse Ethereum.</p>
                        </div>
                        <div className="btns d-flex align-items-center gap-4">
                            <input onChange={e => setAdminAddress(e.target.value)} placeholder="Admin Address" />
                            <button onClick={setAdmin} className='btn_ajout d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i>Autoriser</button>
                        </div>
                        <div className="content_data">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Liste des Administrateurs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminsList.map((item, index) => (
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

export default RegisterAdmin;