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
import Categorical from "./components/Sites/Accomodation/Categorical/Categorical";
import Acc from "./components/Sites/Accomodation/SpecificAcc/Acc";
import AllAcc from "./components/ADMIN/Accom/AllAcc/AllAcc";
import SiteBookings from "./components/Packages/Bookings";
import Testimonals from "./components/Testimonials/Testimonials";

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
                <Route path="/package/:id" element={<SiteBookings />} />
                <Route path="/accomodation/:id" element={<Categorical />} />
                <Route path="/accomodation/:id/:id" element={<Acc />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:id" element={<Sites />} />
                <Route path="/dashboard/accomodation/:id" element={<AllAcc />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
