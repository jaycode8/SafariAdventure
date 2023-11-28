import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Jay";
import Navbar from "./components/Navbar/Navbar";
import Forms from "./components/User/Forms/Forms";
import Otp from "./components/User/OTP/Otp";
import LocD from "./components/Sites/Destinations/LocationDestinations/LocD";
import Site from "./components/Sites/Destinations/SpecificDestination/Site";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/ADMIN/Dashboard/Dashboard";
import Sites from "./components/ADMIN/sites/Sites";

const App = () => {
    return (
        <div className="apps">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/verify" element={<Otp />} />
                <Route path="/:id" element={<LocD />} />
                <Route path="/:id/:id" element={<Site />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/msa" element={<Sites />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
