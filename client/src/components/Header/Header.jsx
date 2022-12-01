import React, { useRef, useEffect } from 'react';
import './header.css';
import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logoImg from '../../assets/images/portrait.png';
import profileImg from '../../assets/images/profile.png';
//import { useState } from 'react';

const NAV_LINKS = [
    {
        display: 'Explorer',
        url: '/market'
    },
    {
        display: 'Artistes',
        url: '/artists'
    }
]

const Header = () => {

    const headerRef = useRef(null);

    const menuRef = useRef(null);

    //const [profile, setProfile] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('header_shrink');
            }
            else {
                headerRef.current.classList.remove('header_shrink');
            }
        })
        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    const toggleMenu = () => menuRef.current.classList.toggle('active_menu');

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <Link to="/home"><h2 className='d-flex gap-2 align-items-center'>
                            <span>
                                <img src={logoImg} alt="" />
                            </span>
                            <h2>DEMOCRATIZ_
                                <span>ART </span></h2>
                        </h2></Link>
                    </div>

                    <div className="nav_menu" ref={menuRef} onClick={toggleMenu}>
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
                        <div className='profile_box'>
                            <div className='profile'>
                                <Link to="/profil" className='profile'>
                                    <img src={profileImg} alt="profile" />
                                </Link>
                            </div>
                        </div>

                        <button className='btn d-flex gap-2 align-items-center'>
                            <span>
                                <i className="ri-wallet-line"></i>
                            </span>
                            <Link to='/#'>
                                Connexion Wallet
                            </Link>
                        </button>

                        <span className="mobile_menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header >
    );
};

export default Header;