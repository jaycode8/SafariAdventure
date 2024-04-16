
import "./Types.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const PropertyTypes = () => {
    const [accTypeList, setAccTypeList] = useState([]);
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
    }, []);

    return (
        <div className="properties" id="accomodation">
            <h2>Accomodation property types</h2>
            <div className="row full-div grid-container">
                <div className="prop-cards grid-container">
                    {
                        accTypeList.map((data, index) => (
                            <div className={`property-card ${classes[index % classes.length]}`} key={index}>
                                <Link to={`/accomodation/${data._id}`}>
                                    <img src={`${data.accomodationPic}`} />
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
