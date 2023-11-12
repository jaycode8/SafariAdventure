import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Jay";
import Navbar from "./components/Navbar/Navbar";
import Forms from "./components/User/Forms/Forms";
import Otp from "./components/User/OTP/Otp";


const App = () => {
    return (
        <div className="apps">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forms" element={<Forms />} />
                <Route path="/verify" element={<Otp />} />
            </Routes>
        </div>
    );
};

export default App;
