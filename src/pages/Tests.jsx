import React from "react";
import { Container } from 'reactstrap';
import CommonSection from '../components/ui/Common-section/CommonSection'
import Test from "../components/ui/Test/Test";

const Tests = () => {

    return <>
        <CommonSection title='Page de Test' />

        <section>
            <Container>
                <Test />
            </Container>
        </section>
    </>
};

export default Tests;