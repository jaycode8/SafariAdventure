
import "./About.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, A11y, EffectCube, Autoplay } from "swiper";
import "swiper/css/navigation";
import {
    BiSolidChevronLeftCircle,
    BiSolidChevronRightCircle,
} from "react-icons/bi";
import pic1 from "../../resources/images/m1.jpg";
import pic2 from "../../resources/images/m2.jpg";
import pic3 from "../../resources/images/m3.webp";
import pic4 from "../../resources/images/m4.jpg";
import pic5 from "../../resources/images/m5.jpg";

const About = () => {

    const images = [pic1, pic2, pic3, pic4, pic5];

    return (
        <div className="about grid-container" id="about">
            <div className="full-div about-text flex-container">
                <h3>About Us</h3>
                <p>
                    At SafariAdventure, we are passionate about showcasing the breathtaking beauty and diverse wonders of Kenya. With years of experience and deep love for this remarkable land, our team is dedicated to crafting unforgattable journeys for travellers from around the world.
                </p>
                <h3>Our Mission</h3>
                <p>
                    We are committed to providing travellors with enriching experiences that go beyond the ordinary. Our mission is to create exceptional adventures that celebrate Kenya's extraodinary wildlife, culture and landscapes while preserving its natural heritage.
                </p>
            </div>
            <div className="full-div pictorals">
                <Swiper
                    modules={[A11y, Navigation, EffectCube, Autoplay]}
                    autoplay={{ delay: 5000 }}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={{ nextEl: "#right-arrow-icon", prevEl: "#left-arrow-icon" }}
                    effect="cube"
                    a11y={true}
                    loop
                    className="pic-swiper"
                >
                    {
                        images.map((img, index) => (
                            <SwiperSlide className="pic-slides full-div">
                                <img src={img} className="full-div" />
                            </SwiperSlide>
                        ))
                    }
                    {/* <SwiperSlide className="pic-slides full-div"> */}
                    {/*     <img src={pic3} className="full-div" /> */}
                    {/* </SwiperSlide> */}
                    {/* <SwiperSlide className="pic-slides"> */}
                    {/*     <img src={pic4} className="full-div" /> */}
                    {/* </SwiperSlide> */}
                    <BiSolidChevronLeftCircle className="nav-icon" id="left-arrow-icon" />
                    <BiSolidChevronRightCircle className="nav-icon" id="right-arrow-icon" />
                </Swiper>
            </div>
        </div>
    )
};

export default About;
