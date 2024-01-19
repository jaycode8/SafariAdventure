
import { MdPinDrop } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y, EffectFlip } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Acc = () => {
    const [details, setDetails] = useState({});
    const [pictures, setPictures] = useState([]);
    const [amenities, setAmenities] = useState([])
    const { id } = useParams();
    const classes = ["vertical", "vertical", "vertical", "horizontal", "horizontal", "square", "square"];

    const fetchAccomodation = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/accomodations/specific/${id}`,
            });
            setDetails(res.data.accomodation);
            setPictures(res.data.accomodation.pictures);
            setAmenities(res.data.accomodation.ammenities.split(','));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAccomodation();
    }, []);

    return (
        <div className="site full-div">
            {
                details != undefined ? (
                    <div className="site-box full-div grid-container">
                        <div className="pictorals">
                            <Swiper
                                modules={[A11y, Pagination, EffectFlip, Autoplay]}
                                pagination={{ type: "progressbar" }}
                                effect="flip"
                                loop
                                autoplay={{ delay: 5000 }}
                                a11y={true}
                                className="s-swiper"
                            >
                                {
                                    pictures.length != [] ? (
                                        pictures.map((pic, index) => (
                                            <SwiperSlide key={index} className="full-div s-slide">
                                                <img src={`${url_api}${pic}`} className="full-div" />
                                            </SwiperSlide>))
                                    ) : ("")
                                }
                            </Swiper>
                        </div>
                        <div className="site-content grid-container">
                            <div className="full-div upper grid-container">
                                <div className="full-div det">
                                    <div className="flex-container">
                                        <MdPinDrop />
                                        <p>{details.acc_location}, Kenya</p>
                                    </div>
                                    <h3>{details.acc_name}</h3>
                                    <p>{details.description}</p>
                                </div>
                                <div className="full-div maps">
                                    <iframe
                                        src={`${details.acc_map}`}
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
                                <h3>Ammenities</h3>
                                <ul>
                                    {
                                        amenities.map((item, index) => (<li key={index}>{item}</li>))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (<p>hey</p>)
            }
        </div>
    )
};

export default Acc;
