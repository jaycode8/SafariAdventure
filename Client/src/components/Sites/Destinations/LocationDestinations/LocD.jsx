
import "./LocD.css";
import { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";

const itemsPerPage = 4;
const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const LocD = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    const [dest, setDest] = useState([]);

    const listOfSites = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/sites/sitelists/${id}`
            });
            setDest(res.data.sites);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        listOfSites();
    }, []);

    const totalPages = Math.ceil(dest.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = dest.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="dest">
            <div className="destination-cards">
                {
                    currentItems.map((dt, index) => (
                        <div className="destination-card" key={index}>
                            <div className="card-img">
                                <img src={`${url_api}${dt.pictures[0]}`} alt={dt.destination_name} className="full-div" />
                            </div>
                            <div className="card-texts">
                                <span className="card-texts-header">
                                    <MdLocationPin />
                                    <p>{(dt.destination_location.locationName)}, Kenya</p>
                                </span>
                                <h3>{dt.destination_name}</h3>
                                <p className="activities">{dt.activities}</p>
                                <Link to={`${dt._id}`} className="more-details">View more</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* pagination */}
            <div className='pagination-controls'>
                {
                    totalPages < 5 ?
                        (
                            pageNumbers.map((pgnum) => (
                                <SwiperSlide className="swiperSlide" key={pgnum}>
                                    <button
                                        onClick={() => handlePageChange(pgnum)}
                                        style={{
                                            fontWeight: currentPage === pgnum ? "bold" : "normal",
                                            borderBottom: currentPage === pgnum ? "3px solid red" : ""
                                        }}
                                    >
                                        {pgnum}
                                    </button>
                                </SwiperSlide>
                            ))

                        )
                        : (
                            <>
                                <Swiper
                                    modules={[Scrollbar, A11y, Pagination, Navigation]}
                                    spaceBetween={0}
                                    slidesPerView={5}
                                    navigation={{ nextEl: "#chevronRight", prevEl: "#chevronleft" }}
                                    pagination={{ clickable: true }}
                                    className="swiper"

                                >
                                    {
                                        pageNumbers.map((pgnum) => (
                                            <SwiperSlide className="swiperSlide" key={pgnum}>
                                                <button
                                                    onClick={() => handlePageChange(pgnum)}
                                                    style={{
                                                        fontWeight: currentPage === pgnum ? "bold" : "normal",
                                                        borderBottom: currentPage === pgnum ? "3px solid red" : "",
                                                    }}
                                                    id={`${currentPage === pgnum ? "activepg" : ""}`}
                                                >
                                                    {pgnum}
                                                </button>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                                <FiChevronLeft id="chevronleft" />
                                <FiChevronRight id="chevronRight" />

                            </>
                        )
                }
            </div>
        </div >
    );
};

export default LocD;
