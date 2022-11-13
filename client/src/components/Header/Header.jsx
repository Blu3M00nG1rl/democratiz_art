import React from 'react';
import './header.css';
import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/images/portrait.png';



const NAV_LINKS = [
    {
        display: 'Accueil',
        url: '/home'
    },
    {
        display: 'Place de Marché',
        url: '/market'
    },
    {
        display: 'Créez',
        url: '/create'
    },
    {
        display: 'Contact',
        url: '/contact'
    }
]

const Header = () => {
    return (
        <header className="header">
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <Link to="/home"><h2 className=' d-flex gap-2 align-items-center'>
                            <span>
                                <img src={logoImg} alt="" />
                            </span>
                            Democratiz Art
                        </h2></Link>
                    </div>





                    <div className="nav_menu">
                        <ul className="nav_list">
                            {NAV_LINKS.map((item, index) => (
                                <li className="nav_item" key={index}>
                                    <NavLink to={item.url} className={navClass => navClass.isActive ? 'active' : ''}
                                    >
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav_right d-flex align-items-center gap-5 ">
                        <button className='btn d-flex gap-2 align-items-center'>
                            <span>
                                <i className="ri-wallet-line"></i>
                            </span>
                            <Link to='/#'>

                                Connexion Wallet
                            </Link>
                        </button>

                        <span className="mobile_menu">
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header >
    );
};

export default Header;