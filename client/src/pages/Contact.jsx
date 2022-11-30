import React from 'react';
import { useRef } from 'react';

import { Col, Container, Row } from 'reactstrap';
import CommonSection from '../components/ui/Common-section/CommonSection.jsx';

const Contact = () => {


    const nameRef = useRef('')
    const emailRef = useRef('')
    const subjectRef = useRef('')
    const messageRef = useRef('')

    const handleSubmit = e => {
        e.preventDefault()
    }



    return <>
        <CommonSection title='Contact' />
        <section>
            <Container>
                <Row>
                    <Col lg='6' md='6' className='m-auto text-center'>
                        <h2>Laissez un message</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Voluptate ut quam id at aperiam soluta perspiciatis
                            numquam suscipit accusantium repellat.
                        </p>
                        <div className="contact mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className='form_input'>
                                    <input type="text" placeholder='Entrez votre nom' ref={nameRef} />
                                </div>
                                <div className='form_input'>
                                    <input type="email" placeholder='Entrez votre email' ref={emailRef} />
                                </div>
                                <div className='form_input'>
                                    <input type="text" placeholder="Entrez l'objet" ref={subjectRef} />
                                </div>
                                <div className='form_input'>
                                    <textarea rows="7" placeholder='Ecrivez votre message' ref={messageRef}></textarea>
                                </div>

                                <button
                                    className='send_btn'
                                    style={{
                                        border: 'none',
                                        padding: '7px 25px',
                                        borderRadius: '5px',
                                        marginTop: '20px'
                                    }}
                                >
                                    Envoyez un message
                                </button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
};

export default Contact;