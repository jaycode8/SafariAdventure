
import "./Destination.css";
import test from "../../../resources/images/test.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, A11y } from 'swiper';
import 'swiper/css/navigation';
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";

const Destinations = () => {
    const data = [1, 2, 3, 4, 5];
    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 500 ? (currentWidth >= 1000 ? "4" : "3") : ("1");
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
                        data.map(data => (
                            <SwiperSlide className="swiper-slide">
                                <div className="d-card">
                                    <h3>Mombasa</h3>
                                    <img src={test} />
                                    <span className="grid-container">
                                        <Link to="#" className="more-btn">see more</Link>
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    <BiSolidChevronLeftCircle className="chevronicon" id="chevronLeft" />
                    <BiSolidChevronRightCircle className="chevronicon" id="chevronRight" />
                </Swiper>

            </div>
        </div>
    )
};

export default Destinations;
