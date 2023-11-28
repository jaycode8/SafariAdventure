
import "./Site.css";
import pic from "../../../../resources/images/14.jpg";
import { MdPinDrop } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Site = () => {
    const [details, setDetails] = useState({});
    const { id } = useParams();
    const classes = ["vertical", "vertical", "vertical", "horizontal", "horizontal", "square", "square"];
    const data = [pic, pic, pic, pic, pic, pic, pic];

    const fetchSite = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/sites/site/${id}`,
            });
            setDetails(res.data.site);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSite();
    }, []);

    return (
        <div className="site full-div">
            {
                details[0] != undefined ? (
                    <div className="site-box full-div grid-container">
                        <div className="pictorals">
                            <div className="pic-gallery full-div">
                                {
                                    data.map((dt, index) => (
                                        <div key={index} className={`${classes[index]} full-div`} id={`col${index + 1}`}>
                                            <img src={pic} className="full-div" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="site-content grid-container">
                            <div className="full-div upper grid-container">
                                <div className="full-div det">
                                    <div className="flex-container">
                                        <MdPinDrop />
                                        <p>{details[0].destination_location.locationName}, Kenya</p>
                                    </div>
                                    <h3>{details[0].destination_name}</h3>
                                    <p>{details[0].description}</p>
                                </div>
                                <div className="full-div maps">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
                                        width="600"
                                        height="450"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        className="full-div"
                                        allowFullScreen=""
                                        aria-hidden="false"
                                        tabIndex="0"
                                    />
                                </div>
                            </div>
                            <div className="full-div lower">
                                <h3>Activities</h3>
                                <ul>{
                                    details[0].activities.split(',').map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))
                                }</ul>
                            </div>
                        </div>
                    </div>
                ) : ("")
            }
        </div>
    )
};

export default Site;
