import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header className='header'>
            <div className='container'>
                <div className="navigation">
                    <div className="logo">
                        <h2 className=' d-flex gap-2 align-items-center'>
                            <img src="logo.png" alt="logo" />
                            Democratiz Art
                        </h2>
                    </div>
                    <div className="nav_menu">
                        <ul className="nav_list">
                            <NavLink to="/" className={(nav) => (nav.isActive ? "active" : "")}>
                                <li className="nav_item">Accueil</li>
                            </NavLink>
                            <NavLink to="/market">
                                <li className="nav_item">MarketPlace</li>
                            </NavLink>
                            <NavLink to="/create">
                                <li className="nav_item">Créez</li>
                            </NavLink>
                            <NavLink to="/contact">
                                <li className="nav_item">Contact</li>
                            </NavLink>
                        </ul>
                    </div>

                    <div className='nav_right d-flex align-items-center gap-5'>
                        <button className='btn d-flex gap-2 align-items-center'>
                            <span>
                                <i className="ri-wallet-line"></i>
                            </span>
                            <NavLink to='/wallet'>Connect Wallet</NavLink>
                        </button>

                        <span className="mobile_menu">
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;