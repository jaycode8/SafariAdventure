
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
    const [pkgPrice, setPkgPrice] = useState();

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

    const fetchSpecificPackage = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/packages/specificpackage/${id}`,
            });
            setPkgPrice(res.data.package.price);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        sessionToken != null ? (fetchLogedUser()) : ("");
        fetchSpecificPackage()
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
                id == "PremiumOn" ? (<Premier user={user} amount={pkgPrice} pkgname={id} />) : (
                    id == "DeluxePlus" ? (<Deluxe user={user} amount={pkgPrice} pkgname={id} />) : (
                        id == "GoldAdvantage" ? (<Gold user={user} amount={pkgPrice} pkgname={id} />) : (
                            id == "SilverExplorer" ? (<Silver user={user} amount={pkgPrice} pkgname={id} />) : (
                                id == "BronzeEssentials" ? (<Bronze user={user} amount={pkgPrice} pkgname={id} />) : (
                                    id == "BudgetGetaway" ? (<Budget user={user} amount={pkgPrice} pkgname={id} />) : (
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
