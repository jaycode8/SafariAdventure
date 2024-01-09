
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import { LuMenuSquare } from "react-icons/lu";
import { GiCrossMark } from "react-icons/gi";
import Location from "../Location/Location";
import Swal from "sweetalert2";
import Package from "../Package/Package";
import AccomodationTypes from "../Accom/Types/Accom";
import LsUsers from "../AvailableUsers/Users";
import axios from "axios";
import { useEffect, useState } from "react";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Dashboard = () => {

    const [locations, setLocations] = useState("");
    const [users, setUsers] = useState("");
    const [pkg, setPkg] = useState("");
    const [accTypes, setAccTypes] = useState("");
    const [sites, setSites] = useState("");
    const [accomodations, setAccomodations] = useState("");

    const toggleSidebar = () => {
        document.querySelector(".sidebar").classList.toggle("activated");
    };

    const alertMsg = (text, btn) => {
        const res = Swal.fire({
            title: "Wild Safari",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: btn,
        });
        return res;
    };

    const logOut = async () => {
        const response = await alertMsg("Confirm logout session", "logOut");
        if (response.isConfirmed) {
            localStorage.removeItem("DRFAuthToken");
            window.location.href = "/";
        }
    };

    const listOfItems = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/locations/locationlists/`,
            });
            const res2 = await axios({
                method: "get",
                url: `${url_api}/users/lsusers/`,
            });
            const res3 = await axios({
                method: "get",
                url: `${url_api}/packages/pkglist/`,
            });
            const res4 = await axios({
                method: "get",
                url: `${url_api}/accomodations/typelists/`,
            });
            const res5 = await axios({
                method: "get",
                url: `${url_api}/sites/all/`,
            });
            const res6 = await axios({
                method: "get",
                url: `${url_api}/accomodations/all/`,
            });
            setLocations(res.data.locations.length);
            setUsers(res2.data.data.length);
            setPkg(res3.data.packages.length);
            setAccTypes(res4.data.types.length);
            setSites(res5.data.sites.length);
            setAccomodations(res6.data.accomodations.length);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfItems();
    }, [])

    return (
        <div className="dashboard full-div grid-container">
            <div className="sidebar full-div">
                <GiCrossMark className="exit-icon" onClick={toggleSidebar} />
                <Sidebar />
            </div>
            <div className="mainwindow full-div">
                <div className="header flex-container">
                    <LuMenuSquare className="menu-icon" onClick={toggleSidebar} />
                    <button className="admin-btn" onClick={logOut}>Log out</button>
                </div>
                <div className="wrapper full-div">
                    <h3>Statistics</h3>
                    <div className="graphs-container flex-container">
                        <div className="stats flex-container">
                            <h4>{users}</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>{locations}</h4>
                            <p>Locations</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>{pkg}</h4>
                            <p>Packages</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>{accTypes}</h4>
                            <p>Accomodation Types</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>{sites}</h4>
                            <p>Sites</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>{accomodations}</h4>
                            <p>Accomodations</p>
                        </div>
                    </div>
                    <div id="users">
                        <LsUsers />
                    </div>
                    <div className="locations" id="locations">
                        <Location />
                    </div>
                    <div className="list-of-packages" id="packages">
                        <Package />
                    </div>
                    <div className="list-of-accomodations" id="accomodations">
                        <AccomodationTypes />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
