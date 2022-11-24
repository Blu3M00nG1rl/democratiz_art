import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import SellerSection from '../components/ui/Seller-section/SellerSection';
import LiveSell from '../components/ui/Live-sell/LiveSell';
import Trending from '../components/ui/Trending-section/Trending';
import StepSection from '../components/ui/Step-section/StepSection';


const Home = () => {
    return <>
        <HeroSection />
        <LiveSell />
        <SellerSection />
        <Trending />
    </>
};

export default Home;