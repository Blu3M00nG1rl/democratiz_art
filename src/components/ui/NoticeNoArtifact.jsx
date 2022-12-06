import { Row } from 'reactstrap';

function NoticeNoArtifact() {
    return (
        <section className="section">
            <Row>
                <div className="content">
                    <h1 className="text-center">
                        Le smart-contract n'est pas accessible. Veuillez connecter votre Metamask.
                    </h1>
                </div>
            </Row>
        </section>

    );
}

export default NoticeNoArtifact;