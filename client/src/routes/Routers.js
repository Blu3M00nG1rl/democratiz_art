import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Artist from "../pages/Artist";

const routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/market' element={<Market />} />
            <Route path='/create' element={<Create />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/artist' element={<Artist />} />
        </Routes>
    );
};

export default routers;