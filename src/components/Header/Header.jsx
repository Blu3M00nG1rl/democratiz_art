import React, { useRef, useEffect, useState } from 'react';
import './header.css';
import { Container } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import logoImg from '../../assets/images/logo.png';
import profileImg from '../../assets/images/profile.png';

const NAV_LINKS = [
    {
        display: 'EXPLORER',
        url: '/market'
    },
    {
        display: 'ARTISTES',
        url: '/artists'
    }
]

function Header() {

    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const toggleMenu = () => menuRef.current.classList.toggle('active_menu');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { provider: ethereum } = provider;
    const [error, setError] = useState('');
    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState("");

    function reload() {
        window.location.reload();
    }

    //Vérifie si le wallet est connecté
    async function checkIfWalletConnected() {
        try {
            if (!window.ethereum)
                return setError("Installez MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log("compte connecté : " + accounts[0]);
            } else {
                setError("Aucun compte trouvé");
                setError(true);
            }
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            //Affichage à deux décimales
            if (bal.includes('.')) {
                const parts = bal.split('.');
                setAccountBalance(parts[0] + '.' + parts[1].slice(0, 2));
            } else {
                setAccountBalance(bal);
            }
        } catch (error) {
            setError("Erreur de connexion au wallet");
            setError(true);
        }
    };

    //Connecte le wallet
    async function connectWallet() {
        try {
            if (!window.ethereum)
                return setError("Installez MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            //Affichage à deux décimales
            if (bal.includes('.')) {
                const parts = bal.split('.');
                setAccountBalance(parts[0] + '.' + parts[1].slice(0, 2));
            } else {
                setAccountBalance(bal);
            }
        } catch (error) {
            setError("Erreur de Connexion au Wallet");
            setError(true);
        }
    };

    //Surveille le changement de compte metamask
    useEffect(() => {
        ethereum?.on("accountsChanged", reload);
        return () => {
            ethereum?.removeListener("accountsChanged", reload);
        };
    });

    //Surveille si le wallet est connecté
    useEffect(() => {
        checkIfWalletConnected();
    });

    //Gestion de la scrollbar
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

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <div className="navigation">
                    <div className="logo">
                        <Link to="/home"><div className='d-flex gap-2 align-items-center'>
                            <span>
                                <img src={logoImg} alt="" />
                            </span>
                            <h2 className='text_img'>EMOCRATIZ_
                                <span>ART </span></h2>
                        </div></Link>
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

                        {
                            //Gestion du bouton de connexion
                            currentAccount === ""
                                ?
                                <button className='btn d-flex gap-2 align-items-center' name="Connect" onClick={connectWallet}>
                                    <span>
                                        <i className="ri-wallet-line"></i>
                                    </span>
                                    Connexion Wallet
                                </button>
                                :
                                <div className='d-flex gap-2 align-items-center'>
                                    <div className='profile'>
                                        <Link to="/profile" className='profile'>
                                            <img src={profileImg} alt="profile" />
                                        </Link>
                                    </div>
                                    <div className='profile_box d-flex gap-2 align-items-center'>
                                        <i className="ri-wallet-line"></i>
                                        {currentAccount.substring(0, 6) + "......" + currentAccount.substring(currentAccount.length - 6) + " (" + accountBalance + " MATIC)"}
                                    </div>
                                </div>}

                        <span className="mobile_menu">
                            <i className="ri-menu-line" onClick={toggleMenu}></i>
                        </span>
                    </div>
                    {error}
                </div>
            </Container>
        </header >
    );
};

export default Header;