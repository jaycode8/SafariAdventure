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
import axios from "axios";
import { useEffect, useState } from "react";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Destinations = () => {
    const [locations, setLocations] = useState([]);
    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 500 ? (currentWidth >= 1000 ? "4" : "3") : "1";

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
                    navigation={{ nextEl: "#chevronRight", prevEl: "#chevronLeft" }}
                    loop
                    className="swiper"
                >
                    {
                        locations.map((data, index) => (
                            <SwiperSlide className="swiper-slide" key={index}>
                                <div className="d-card">
                                    <h3>{data.locationName}</h3>
                                    <img src={`${url_api}${data.locationPic}`} />
                                    <span className="grid-container">
                                        <Link to={`${data._id}`} className="more-btn">
                                            see more
                                        </Link>
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <BiSolidChevronLeftCircle className="chevronicon" id="chevronLeft" />
                    <BiSolidChevronRightCircle
                        className="chevronicon"
                        id="chevronRight"
                    />
                </Swiper>
            </div>
        </div>
    );
};

export default Destinations;
