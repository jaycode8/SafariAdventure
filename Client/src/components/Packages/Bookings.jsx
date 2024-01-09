
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

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const SiteBookings = () => {
    const { id } = useParams();
    const [accTypeList, setAccTypeList] = useState([]);

    const listOfAccTypes = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/accomodations/typelists/`,
            });
            setAccTypeList(res.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        listOfAccTypes();
    }, []);

    return (
        <div className="site-bookings grid-container">
            <h1>{id}</h1>
            {
                id == "PremiumOn" ? (<Premier />) : (
                    id == "DeluxePlus" ? (<Deluxe />) : (
                        id == "GoldAdvantage" ? (<Gold />) : (
                            id == "SilverExplorer" ? (<Silver />) : (
                                id == "BronzeEssentials" ? (<Bronze />) : (
                                    id == "BudgetGetaway" ? (<Budget />) : (
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
