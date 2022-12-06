import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import LiveSell from '../components/ui/Live-sell/LiveSell';
import Trending from '../components/ui/Trending-section/Trending';

const Home = () => {
    return <>
        <HeroSection />
        <LiveSell />
        <Trending />
    </>
};

export default Home;