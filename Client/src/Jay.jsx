import './App.css';
import Community from './components/Community/Community';
import Footer from './components/Footer/Footer';
import LandingPage from "./components/Landing/Landing"
import Packages from './components/Packages/Packages';
import Services from './components/Services/Services';
import PropertyTypes from './components/Sites/Accomodation/Types';
import Destinations from './components/Sites/Destinations/Destination';

const Home = () => {
    return (
        <div className="apps">
            <LandingPage />
            <Services />
            <Packages />
            <Destinations />
            <PropertyTypes />
            <Community />
            <Footer />
        </div>
    )
};

export default Home;
