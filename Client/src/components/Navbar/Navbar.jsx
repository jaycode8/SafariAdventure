import { useEffect, useState } from "react";
import "./Navbar.css";
import { BiMenu, BiSearch, BiUserCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import logo from "../../resources/images/logo.png";
import Mngt from "../User/Management/Mngt";
import axios from "axios";
import { BiCross } from "react-icons/bi";

const sessionToken = localStorage.getItem("DRFAuthToken");
const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const [user, setUser] = useState();

    const toggleMenu = () => {
        setNavActive(!navActive);
    };

    const toggleUserProfile = () => {
        document.querySelector(".user-panel").classList.toggle("openPannel");
    };

    const fetchLogedUser = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/users/user`,
                headers: {
                    Authorization: `Token ${sessionToken}`,
                },
            });
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    const currentPath = window.location.pathname;
    const basePath = currentPath.split("/")[1];
    const location = useLocation();

    useEffect(() => {
        sessionToken ? fetchLogedUser() : "";
    }, []);

    let id_name = ''
    basePath.length >= 5 ? (id_name = "otherRoutes") : (id_name = "home")

    return (
        <div className="nav-bar" id={`${basePath}`}>
            <section>
                {basePath == "forms" ? (
                    <div className="form-nav">
                        <Link className="backButton" to="/">
                            <BsArrowLeftCircleFill className="bkIcon" />
                            <p>HOME</p>
                        </Link>
                    </div>
                ) : (
                    <div className="normal-nav grid-container" id={id_name}>
                        <div className="logo">
                            <Link to="/"><img src={logo} className="full-div" /></Link>
                        </div>
                        <nav>
                            <ul className={`nav ${navActive ? "active" : ""} ${id_name}`}>
                                <a href="#home" onClick={toggleMenu}>
                                    <li>Home</li>
                                </a>
                                <a href="#about" onClick={toggleMenu}>
                                    <li>About</li>
                                </a>
                                <a href="#services" onClick={toggleMenu}>
                                    <li>Services</li>
                                </a>
                                <a href="#packages" onClick={toggleMenu}>
                                    <li>packages</li>
                                </a>
                                <a href="#destination" onClick={toggleMenu}>
                                    <li>destinations</li>
                                </a>
                                <a href="#accomodation" onClick={toggleMenu}>
                                    <li>accomodation</li>
                                </a>
                                <a href="#testimonials" onClick={toggleMenu}>
                                    <li>testimonials</li>
                                </a>
                                <a href="#contact" onClick={toggleMenu}>
                                    <li>Contacts</li>
                                </a>
                            </ul>
                            <div className="user-icon full-div grid-container">
                                {sessionToken ? (
                                    <div className="users-profile" onClick={toggleUserProfile}>
                                        {user ? (
                                            <img
                                                src={`${url_api}/${user.profile}`}
                                                className="full-div"
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                ) : (
                                    <Link to="/forms">
                                        <BiUserCircle className="icon user" />
                                    </Link>
                                )}
                            </div>
                            <BiSearch className="icon search" />
                            <BiMenu className="icon menubar" onClick={toggleMenu} />
                        </nav>
                    </div>

                )
                }
            </section >
            <div className="user-panel">
                <BiCross className="cross" onClick={toggleUserProfile} />
                <Mngt data={sessionToken} />
            </div>
        </div >
    );
};

export default Navbar;
