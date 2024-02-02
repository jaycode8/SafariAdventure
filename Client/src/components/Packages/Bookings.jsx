
import { useParams } from "react-router-dom";
import "./Bookings.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Premier from "./package/PremierOn";
import Deluxe from "./package/Deluxe";
import Gold from "./package/Gold";
import Silver from "./package/Silver";
import Bronze from "./package/Bronze";
import Budget from "./package/Budget";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const sessionToken = localStorage.getItem("DRFAuthToken");

const SiteBookings = () => {
    const { id } = useParams();
    const [user, setUser] = useState();

    const logIn = async () => {
        const res = await Swal.fire({
            title: "Safari Adventure",
            text: "You need to be logged in to proceed.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "logIn",
            background: "#0a1930",
            color: "#cbdaf7"
        });
        if (res.isConfirmed) {
            window.location.href = "/forms";
        } else {
            location.href = "/"
        }
    }

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
        window.scrollTo(0, 0);
        sessionToken != null ? (fetchLogedUser()) : ("")
    }, []);

    sessionToken == null ? (
        logIn()
    ) : (
        ("")
    )

    return (
        <div className="site-bookings grid-container">
            <h1>{id}</h1>
            {
                id == "PremiumOn" ? (<Premier user={user} />) : (
                    id == "DeluxePlus" ? (<Deluxe user={user} />) : (
                        id == "GoldAdvantage" ? (<Gold user={user} />) : (
                            id == "SilverExplorer" ? (<Silver user={user} />) : (
                                id == "BronzeEssentials" ? (<Bronze user={user} />) : (
                                    id == "BudgetGetaway" ? (<Budget user={user} />) : (
                                        <p>comming soon</p>
                                    )
                                )
                            )
                        )
                    )
                )
            }
        </div>
    )
};

export default SiteBookings;
