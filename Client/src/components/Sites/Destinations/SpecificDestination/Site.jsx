
import "./Site.css";
import { MdPinDrop } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y, EffectFlip } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Site = () => {
    const [details, setDetails] = useState({});
    const { id } = useParams();

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
        <div className="site full-divs">
            {
                details[0] != undefined ? (
                    <div className="site-box full-div grid-container">
                        <div className="pictorals">
                            <Swiper
                                modules={[A11y, Pagination, EffectFlip, Autoplay]}
                                pagination={{ type: "progressbar" }}
                                effect="flip"
                                loop
                                autoplay={{ delay: 5000 }}
                                a11y={true}
                                className="full-divs s-swiper"
                            >
                                {
                                    details.legth != [] ? (
                                        details.map((pictures, index) => (
                                            pictures.pictures.map((pic, index) => (
                                                <SwiperSlide key={index} className="full-div s-slide">
                                                    <img src={`${url_api}${pic}`} className="full-div" />
                                                </SwiperSlide>))
                                        ))) : ("")
                                }
                            </Swiper>
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
                                        src={`${details[0].dest_map}`}
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
