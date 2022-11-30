import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Contact from "../pages/Contact";
import NftDetails from '../pages/NftDetails';
import Artists from '../pages/Artists';
import Profil from '../pages/Profil';

const routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/market' element={<Market />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/profil' element={<Profil />} />
            <Route path='/market/:id' element={<NftDetails />} />
        </Routes>
    );
};

export default routers;