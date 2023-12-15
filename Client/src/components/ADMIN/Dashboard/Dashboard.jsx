
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import { LuMenuSquare } from "react-icons/lu";
import { GiCrossMark } from "react-icons/gi";
import Location from "../Location/Location";
import Swal from "sweetalert2";
import Package from "../Package/Package";
import AccomodationTypes from "../Accom/Types/Accom";
import LsUsers from "../AvailableUsers/Users";

const Dashboard = () => {
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
                            <h4>10</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>10</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>10</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>10</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>10</h4>
                            <p>Users</p>
                        </div>
                        <div className="stats flex-container">
                            <h4>10</h4>
                            <p>Users</p>
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
