import Routers from '../../routes/Routers'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Layout() {

    return (
        <>
            <Header />
            <div>
                <Routers />
            </div>
            <Footer /></>
    );
};

export default Layout;