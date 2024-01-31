
import "./Testimonials.css";
import { ImQuotesLeft } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, A11y, Autoplay } from "swiper";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Testimonals = () => {
    const [comments, setComments] = useState([]);

    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 650 ? (currentWidth >= 1200 ? "3" : "2") : "1";

    const listOfTestimonials = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/contacts/cmt`,
            });
            setComments(res.data.comments);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfTestimonials();
    }, []);

    console.log(comments)

    return (
        <div className="testimonials grid-containers" id="testimonials">
            <h2>testimonials</h2>
            <div className="test-cards full-div grid-container">
                <Swiper
                    modules={[A11y, Navigation, Autoplay]}
                    slidesPerView={slides}
                    spaceBetween={10}
                    autoplay={true}
                    loop
                    className="swiper-two"
                >
                    {
                        comments.map((ts, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimony flex-container">
                                    <div className="test-pic full-div">
                                        <img src={`${url_api}${ts.user.profile}`} className="full-div" />
                                    </div>
                                    <div className="test-infor full-div">
                                        <div className="test-details full-div flex-container">
                                            <ImQuotesLeft className="quotes" />
                                            <p>{ts.comment}</p>
                                            <h4>{ts.user.username}</h4>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
};

export default Testimonals;
