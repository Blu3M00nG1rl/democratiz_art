

import React from 'react';

import './modal.css';

const Modal = ({ setShowModal }) => {
    return <div className="modal_wrapper">
        <div className="single_modal">
            <span className="close_modal">
                <i className='ri-close-line' onClick={() => setShowModal(false)}></i>
            </span>

            <h6 className='text-center text-dark'>Acheter</h6>
            <p className='text-center text-dark'><span>58900 MATIC</span></p>





            <div className='input_item mb-3'>
                <h6>Entrez la quantité, 7 disponibles</h6>
                <input type="number" placeholder="Entrez une quantité" />
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Prix d'Achat</p>
                <span className='money'>50000 MATIC</span>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Frais de service</p>
                <span className='money'>8900 MATIC</span>
            </div>

            <div className='d-flex align-items-center justify-content-between'>
                <p>Prix Total</p>
                <span className='money'>58900 MATIC</span>
            </div>

            <button className='buy-btn'>
                Acheter
            </button>
        </div>
    </div>
};

export default Modal;