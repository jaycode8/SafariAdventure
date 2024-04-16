import "./Destination.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, A11y } from "swiper";
import "swiper/css/navigation";
import {
    BiSolidChevronLeftCircle,
    BiSolidChevronRightCircle,
} from "react-icons/bi";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Destinations = () => {
    const [locations, setLocations] = useState([]);
    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 500 ? (currentWidth >= 1000 ? "3" : "2") : "1";

    const listOfLocations = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/locations/locationlists/`,
            });
            setLocations(res.data.locations);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfLocations();
    }, []);

    return (
        <div className="destinations" id="destination">
            <h2>popular destinations</h2>
            <div className="dest-cards full-div grid-container">
                <Swiper
                    modules={[A11y, Navigation]}
                    slidesPerView={slides}
                    spaceBetween={10}
                    navigation={{ nextEl: "#arrow-right", prevEl: "#arrow-left" }}
                    loop
                    className="swiper"
                >
                    {
                        locations.map((data, index) => (
                            <SwiperSlide className="swiper-slide" key={index}>
                                <div className="d-card grid-container">
                                    <div className="card-img full-div">
                                        <img src={`${data.locationPic}`} className="full-div" />
                                    </div>
                                    <div className="card-details flex-container full-div">
                                        <h3>Enjoy the beauty place in {data.locationName}</h3>
                                        <Link to={`${data._id}`} className="more-btn">
                                            see more
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <FaArrowCircleLeft className="arrow-icon" id="arrow-left" />
                    <FaArrowCircleRight className="arrow-icon" id="arrow-right" />
                </Swiper>
            </div>
        </div>
    );
};

export default Destinations;
