import { useState } from "react"
import axios from "axios"
import { Col, Row } from "reactstrap";
import { ethers } from "ethers";
import creatorImg from '../../../assets/images/profile.png';
import defaultNftImg from '../../../assets/images/nft-logo.png';
import { fetchContract } from '../../../context/constants.js';
import './create-nft.css';
const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1ZDRiNTAxMS0xODhiLTQ3NmYtYTE5MC0zNjhiNWI4YTM3NmEiLCJlbWFpbCI6InNjc29waGllY29uc3RhbnRpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDI4MmRlYWE3MmRmMjA0MDBkMDMiLCJzY29wZWRLZXlTZWNyZXQiOiJkMmVjN2UwNDlmMDE3ZDExZDZiOTIzMWUxMTFjMzk1MGU2YmNmNzA4ZmY0ZWU1ZGZkYWIyNzU1ZjlmZDJkNGYxIiwiaWF0IjoxNjcwMTg3MjE2fQ.nbdMRSIJEpjfxKv4D0yT5E8PR_dOoSG1CI8AeOFSMk4`

function UploadNft() {
    const [formParams, updateFormParams] = useState({ name: '', description: '', type: '', year: '', long: '', larg: '', price: '', numbNfts: '', royalties: '' });
    const [selectedFile, setSelectedFile] = useState();
    const [nameFile, setNameFile] = useState();
    const [filePinataId, setFilePinataId] = useState(null);
    const [fileURL, setFileURL] = useState(defaultNftImg);
    const [fileUploaded, setFileUploaded] = useState(false); //gère l'affichage du bouton create
    const [loading, setLoading] = useState(false);

    function changeHandler(event) {
        setSelectedFile(event.target.files[0]);
        setNameFile(event.target.files[0].name);
    };

    async function uploadFileToIPFS(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', selectedFile)

        const metadata = JSON.stringify({
            name: nameFile,
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        })
        formData.append('pinataOptions', options);

        try {
            setLoading(true);
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: JWT
                }
            });
            console.log("Fichier uploadé à cette adresse : https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash);
            setFilePinataId(res.data.IpfsHash);
            setFileURL("https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash);
            setFileUploaded(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // CREATION DU NFT
    async function createNFT(e) {
        e.preventDefault();
        //
        const { name, description, type, year, long, larg, price, numbNfts, royalties } = formParams;
        //Vérifie que les données ne sont pas vides
        if (!name || !description || !type || !year || !long || !larg || !price || !numbNfts || !royalties || !filePinataId) {
            console.log(name, description, type, year, long, larg, price, numbNfts, royalties, filePinataId)
            alert("Tous les champs ne sont pas remplis");
        }
        else {
            const nftJSON = {
                "pinataMetadata": { "name": name },
                "pinataContent": { name, description, type, year, long, larg, price, numbNfts, royalties, image: filePinataId }
            }

            try {
                setLoading(true);
                const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
                const res = await axios.post(url, nftJSON, {
                    maxBodyLength: "Infinity",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: JWT
                    }
                });
                console.log("Fichier JSON uploadé sur Pinata: ", res.data.IpfsHash);
                const jsonURL = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
                setLoading(false);
                console.log(res.data);
                await createSale(jsonURL, price);
                alert("Votre NFT vient d'être créé!");
                updateFormParams({ name: '', description: '', type: '', year: '', long: '', larg: '', price: '', numbNfts: '', royalties: '' });
                setFileURL(null);
            } catch (error) {
                alert("Erreur lors de la création de votre NFT : ", error);
            }
        }
    }

    // CREATION DE LA VENTE
    async function createSale(jsonURL, price, isReselling, id) {
        try {
            console.log(jsonURL, price, isReselling, id);
            const NFTprice = ethers.utils.parseUnits(price, "ether");

            const contract = await connectingWithSmartContract();

            const listingPrice = await contract.getListingPrice();

            const transaction = !isReselling
                ? await contract.createToken(jsonURL, NFTprice, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, NFTprice, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            console.log(transaction);
        } catch (error) {
            alert("Erreur pendant la création de la vente");
            console.log(error);
        }
    };

    // CONNECTING WITH SMART CONTRACT
    async function connectingWithSmartContract() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            return contract;
        } catch (error) {
            console.log("Erreur de connexion au contrat : ", error);
        }
    };

    const buttonCreate = <>
        <div>
            <button className="create_btn" onClick={createNFT}><i className="ri-lightbulb-flash-line"></i>CREATION NFT</button>
        </div>
    </>

    return (
        <>
            <div className="">
                <div className="flex flex-col place-items-center mt-10" id="nftForm">
                    <form className="px-8 pt-4 pb-8 mb-4">
                        <Row>
                            <Col lg='3' className='mb-5'>
                                <div className="form-group mb-4">
                                    <label htmlFor="name">Titre</label>
                                    <input id="name" type="text" className="form-control" placeholder="Nom" value={formParams.name} onChange={e => updateFormParams({ ...formParams, name: e.target.value })} />
                                </div>
                                <div className="form-group mb-6">
                                    <label htmlFor="description">Description</label>
                                    <textarea id="description" type="text" className="form-control" cols="40" rows="5" placeholder="Description" value={formParams.description} onChange={e => updateFormParams({ ...formParams, description: e.target.value })}></textarea>
                                </div>
                            </Col>
                            <Col lg='2' className='mb-5'>
                                <h6 className="mb-4">Caractéristiques</h6>
                                <div className="form-group mb-6">
                                    <label htmlFor="type">Type d'Art</label>
                                    <select id="type" className="form-control" value={formParams.type} onChange={e => updateFormParams({ ...formParams, type: e.target.value })}>
                                        <option defaultValue>Choix catégorie</option>
                                        <option value="Peinture">Peinture</option>
                                        <option value="Sculpture">Sculpture</option>
                                        <option value="Photographie">Photographie</option>
                                        <option value="Dessin">Dessin</option>
                                        <option value="Collage">Collage</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="year">Annee de création</label>
                                    <input id="year" type="number" min="1900" max="2100" step="1" value={formParams.year} className="form-control" placeholder="2022" onChange={e => updateFormParams({ ...formParams, year: e.target.value })} />
                                </div>
                                <h6 className="mt-3">Format de l'oeuvre</h6>
                                <div className="form-group mt-4">
                                    <label htmlFor="long">Longueur</label>
                                    <input id="long" type="number" className="form-control" placeholder="en cm" onChange={e => updateFormParams({ ...formParams, long: e.target.value })} value={formParams.long} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="larg">Largeur</label>
                                    <input id="larg" type="number" className="form-control" placeholder="en cm" value={formParams.larg} onChange={e => updateFormParams({ ...formParams, larg: e.target.value })} />
                                </div>
                            </Col>
                            <Col lg='2' className='mb-5'>
                                <h6 className="mb-4">Tokenisation</h6>
                                <div className="form-group mt-4">
                                    <label htmlFor="price">Prx (en MATIC)</label>
                                    <input id="price" type="number" className="form-control" placeholder="Min 0.01 MATIC" step="0.01" value={formParams.price} onChange={e => updateFormParams({ ...formParams, price: e.target.value })}></input>
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="numbNfts">Nombre de NFTs</label>
                                    <input id="numbNfts" type="number" className="form-control" placeholder="Nombre" min="2" max="  100" step="2" value={formParams.numbNfts} onChange={e => updateFormParams({ ...formParams, numbNfts: e.target.value })} />
                                </div>
                                <div className="form-group mt-4">
                                    <label htmlFor="royalties">Royalties(en %)</label>
                                    <input id="royalties" type="text" className="form-control" placeholder="5" value={formParams.royalties} onChange={e => updateFormParams({ ...formParams, royalties: e.target.value })} />
                                </div>
                            </Col>
                            <Col lg='5' className='mb-5'>
                                <h6 className="mb-4">Import Image</h6>
                                <div className="form-group">
                                    <label className="form-label"></label>
                                    <input type="file" name="file" onChange={changeHandler} />
                                </div>
                                <div className="d-flex text-align-center justify-between">
                                    <div>
                                        <button className="create_btn" onClick={uploadFileToIPFS}><i className="ri-file-upload-line"></i>Chargement Fichier</button>
                                    </div>
                                    {fileUploaded === true ? buttonCreate : ""}
                                </div>
                                <h5 className='mt-2 text-dark'>Prévisualisation</h5>
                                <div className="single_nft_card">
                                    <Row>
                                        <Col lg='7' className='mb-5'>
                                            {loading ? (
                                                <p className="badge rounded-pill bg-secondary">Chargemnt en cours...</p>
                                            ) : (
                                                <div className="upload_img">
                                                    <span>
                                                        <img src={fileURL} alt="" />
                                                    </span>
                                                </div>)}
                                            <h5 className='nft_title'>{formParams.name}</h5>
                                        </Col>
                                        <Col lg='5' className='mb-5'>
                                            <div className="nft_content">


                                                <div className="creator_img">
                                                    <img src={creatorImg} alt="" className='w-100' />
                                                </div>

                                                <div className='creator_info w-100'>
                                                    <div className=" d-flex align-items-center justify-content-between">
                                                        <h6>Créé Par</h6>
                                                        <p>Artist DB</p>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6>Type d'Art</h6>
                                                        <p>{formParams.type}</p>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <h6>Année de création</h6>
                                                        <p>{formParams.year}</p>
                                                    </div>

                                                    <div className="mb-2">
                                                        <h6>Format de l'oeuvre</h6>
                                                        <p>{formParams.long} x {formParams.larg}</p>
                                                    </div>

                                                    <div className="mb-2">
                                                        <h6>Prix Total</h6>
                                                        <p>{formParams.price} MATIC ({formParams.price * 10} Euros)</p>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6>Nombre de NFT</h6>
                                                        <p>{formParams.numbNfts}</p>
                                                    </div>

                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6>Royalties</h6>
                                                        <p>{formParams.royalties} %</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UploadNft;