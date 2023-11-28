
import "./Types.css";
import img1 from "../../../resources/images/test.jpg";
import img2 from "../../../resources/images/14.jpg";
import img3 from "../../../resources/images/ts2.jpg";
import img4 from "../../../resources/images/bg.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const PropertyTypes = () => {
    const [accTypeList, setAccTypeList] = useState([]);
    const data = [img1, img2, img3, img4, img4, img1, img2, img3, img2, img3];
    const classes = ["tall", "wide", "square"];

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
        listOfAccTypes();
    }, [])

    return (
        <div className="properties" id="accomodation">
            <h2>Accomodation property types</h2>
            <div className="row full-div grid-container">
                <div className="prop-cards grid-container">
                    {
                        accTypeList.map((data, index) => (
                            <div className={`property-card ${classes[index % classes.length]}`} >
                                <Link to="/12345">
                                    <img src={`${url_api}${data.accomodationPic}`} />
                                    <div className="prop-overlay grid-container">
                                        <h3>{data.accomodationType}</h3>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
};

export default PropertyTypes;
