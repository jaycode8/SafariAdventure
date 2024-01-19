import "./App.css";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Home2 from "./components/Landing/Home";
import Packages from "./components/Packages/Packages";
import Services from "./components/Services/Services";
import PropertyTypes from "./components/Sites/Accomodation/Types/Types";
import Destinations from "./components/Sites/Destinations/Locations/Destination";
import Testimonals from "./components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="apps">
            <Home2 />
            <About />
            <Services />
            <Packages />
            <Destinations />
            <PropertyTypes />
            <Testimonals />
            <Contact />
        </div>
    );
};

export default Home;
