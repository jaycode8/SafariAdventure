
import "./Sidebar.css";
import logo from "../../../resources/images/logo.png";
import { useState } from "react";

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(1);

    const handleClick = (index) => {
        setActiveLink(index);
    };

    return (
        <div className="aside full-div">
            <div className="company flex-container">
                <div className="c-logo">
                    <img src={logo} className="full-div" />
                </div>
            </div>
            <div className="nav">
                <ul>
                    <a href="#">
                        <li className={activeLink === 1 ? "active" : ""} onClick={() => handleClick(1)}>Dashboard</li>
                    </a>
                    <a href="#">
                        <li className={activeLink === 2 ? "active" : ""} onClick={() => handleClick(2)}>Users</li>
                    </a>
                    <a href="#locations">
                        <li className={activeLink === 3 ? "active" : ""} onClick={() => handleClick(3)}>Locations</li>
                    </a>
                    <a href="#packages">
                        <li className={activeLink === 4 ? "active" : ""} onClick={() => handleClick(4)}>Packages</li>
                    </a>
                    <a href="#accomodation">
                        <li className={activeLink === 5 ? "active" : ""} onClick={() => handleClick(5)}>Accomodations</li>
                    </a>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;
