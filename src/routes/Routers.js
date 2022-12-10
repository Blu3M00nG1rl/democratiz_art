import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Contact from "../pages/Contact";
import NftDetails from '../pages/NftDetails';
import Artists from '../pages/Artists';
import Profile from '../pages/Profile';
import ReSellToken from '../pages/ReSellToken';
import Test from '../pages/Tests';

const routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/market' element={<Market />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/test' element={<Test />} />
            <Route path='/market/:tokenId' element={<NftDetails />} />
            <Route path='/resell/:tokenId' element={<ReSellToken />} />
            <Route path='/register' component={() => {
                window.location.replace('https://docs.google.com/forms/d/e/1FAIpQLSehekEMHxtO1bsUW0zNlPjTwPavHqdXo9EDE_5hDowaAskslg/viewform');
            }} />
        </Routes>
    );
};

export default routers;