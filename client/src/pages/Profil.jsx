import React from 'react';
//import useEth from '../contexts/EthContext/useEth';
import CreateNft from '../components/ui/Create-Nft/CreateNft.jsx';
import CommonSection from '../components/ui//Common-section/CommonSection';
//import NoticeNoArtifact from '../components/ui/NoticeNoArtifact';
//import NoticeWrongNetwork from "../components/ui/NoticeWrongNetwork";

const Profil = () => {
    //const { state } = useEth();

    const create_nft =
        <>
            <CreateNft />
        </>;

    return <>
        <CommonSection title='Votre Profil' />
        {
            //!state.artifact ? <NoticeNoArtifact /> :
            //!state.contract ? <NoticeWrongNetwork /> :
            create_nft
        }

    </>

};

export default Profil;