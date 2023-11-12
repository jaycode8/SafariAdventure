
import "./Services.css";
import { FaMapMarked, FaWallet, FaCompass } from "react-icons/fa";
import { BsCamera2 } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";
import { PiBusLight } from "react-icons/pi";
import pic from "../../resources/images/tourists.jpg";

const Services = () => {
    return (
        <div className="services grid-container full-div" id="services">
            <div className="col-1 flex-container full-div">
                <h3>Our Services</h3>
                <div className="text-box full-div flex-container">
                    <h2>Join the adventure with stories</h2>
                    <p>
                        Exlore the heart of Kenya with us and unlock a world of diverse experiences. Our range of services is designed to transform your journey into an unforgettable adventure. Choose from carefully crafted safari packages, each offering a unique and immersive exploration of Kenya's wild life, culture and natural beauty.
                    </p>
                    <div className="serv-cards full-div grid-container">
                        <div className="serv-card">
                            <FaMapMarked className="icon" />
                            <h4>Customizable Destinations</h4>
                        </div>
                        <div className="serv-card">
                            <BsCamera2 className="icon" />
                            <h4>unforgettable moments</h4>
                        </div>
                        <div className="serv-card">
                            <FaWallet className="icon" />
                            <h4>competitive pricings</h4>
                        </div>
                        <div className="serv-card">
                            <FaCompass className="icon" />
                            <h4>self guide</h4>
                        </div>
                        <div className="serv-card">
                            <MdEventAvailable className="icon" />
                            <h4>24/7 available</h4>
                        </div>
                        <div className="serv-card">
                            <PiBusLight className="icon" />
                            <h4>Transportation</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2 grid-container full-div">
                <img src={pic} alt="pic" className="full-div" />
            </div>
        </div>
    )
};

export default Services;
