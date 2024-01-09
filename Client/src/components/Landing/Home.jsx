
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import axios from "axios";

const sessionToken = localStorage.getItem("DRFAuthToken");
const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Home2 = () => {

    const [user, setUser] = useState();

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

    useEffect(() => {
        fetchLogedUser()
    }, []);

    user ? (
        user.is_superuser ?
            (window.location.href = "/dashboard")
            : ("")
    ) : ("");

    return (
        <div className="landing grid-container">
            <div className="navigation">
                <Navbar />
            </div>
            <div className="textbox">
                <h1>HOT TOURS</h1>
                <h2>Welcome to incredible Safari experience</h2>
            </div>
        </div>
    )
};

export default Home2;
