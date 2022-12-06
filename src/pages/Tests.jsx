import React from 'react';
import { Container } from 'reactstrap';
import Test from '../components/ui/Test/Test';
import CommonSection from '../components/ui/Common-section/CommonSection'

const Tests = () => {
    return <>
        <CommonSection title='Test slice' />

        <section>
            <Container>
                <Test />
            </Container>
        </section>
    </>
};

export default Tests;