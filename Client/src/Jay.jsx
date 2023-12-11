import "./App.css";
import Community from "./components/Community/Community";
import Footer from "./components/Footer/Footer";
import Home2 from "./components/Landing/Home";
import LandingPage from "./components/Landing/Landing";
import Packages from "./components/Packages/Packages";
import Services from "./components/Services/Services";
import PropertyTypes from "./components/Sites/Accomodation/Types/Types";
import Destinations from "./components/Sites/Destinations/Locations/Destination";

const Home = () => {
    return (
        <div className="apps">
            <Home2 />
            <Services />
            <Packages />
            <Destinations />
            <PropertyTypes />
            <Community />
        </div>
    );
};

export default Home;
