
import { Link } from "react-router-dom";
import "./Packages.css";
import { BiSolidChevronLeftCircle, BiSolidChevronRightCircle } from "react-icons/bi";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, A11y, Autoplay } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import elephant from "../../resources/images/elephant.png";

const Packages = () => {
    const data = [1, 2, 3, 4, 5];
    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 500 ? (currentWidth >= 1000 ? "3" : "2") : ("1");
    return (
        <div className="packages full-div" id="packages">
            <div className="row-container">
                <div className="coll-1 grid-container">
                    <span className="grid-container">
                        <h3>why choose us?</h3>
                        <h2>Let us show you the beauty of Kenya</h2>
                        <Link className="link">Book now</Link>
                    </span>
                </div>
                <div className="coll-2 full-div">
                    <Swiper
                        modules={[A11y, Autoplay, Navigation]}
                        spaceBetween={0}
                        slidesPerView={slides}
                        navigation={{ nextEl: "#chevronRight", prevEl: "#chevronleft" }}
                        loop
                        className="swiper"
                    >
                        {
                            data.map(data => (
                                <SwiperSlide className="swiperSlide">
                                    <section className="swipperSection">
                                        <div className="package-img">
                                            <img src={elephant} />
                                            <span className="package-overlay">
                                                <p className="price">ksh. 45000</p>
                                                <p className="type">PremiumOn</p>
                                            </span>
                                        </div>
                                        <div className="package-text">
                                            Unleash the pinnacle of luxury and personalized service on your Kenyan adventure, where opulence meets untamed beauty.
                                        </div>
                                    </section>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <BiSolidChevronLeftCircle className="chevronicon" id="chevronLeft" />
                    <BiSolidChevronRightCircle className="chevronicon" id="chevronRight" />
                </div>
            </div>
        </div >
    )
};

export default Packages;
