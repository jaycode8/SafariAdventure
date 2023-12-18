
import { useEffect, useState } from "react";
import test from "../../../../resources/images/test.jpg";
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

const Categorical = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    const [currentPage, setCurrentPage] = useState(1);
    const { id } = useParams();
    const [cat, setCat] = useState([]);
    const [accType, setAccType] = useState("");

    const categorizedAcc = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/accomodations/lists/${id}`
            });
            setCat(res.data.accomodation);
            setAccType(res.data.type)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        categorizedAcc();
    }, []);

    const totalPages = Math.ceil(cat.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = cat.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="dest">
            <h3 className="dest-heading">{accType}</h3>
            <div className="destination-cards">
                {
                    currentItems.map((dt, index) => (
                        <div className="destination-card" key={index}>
                            <div className="card-img">
                                <img src={`${url_api}${dt.pictures[0]}`} alt={dt.acc_name} className="full-div" />
                            </div>
                            <div className="card-texts">
                                <span className="card-texts-header">
                                    <MdLocationPin />
                                    <p>{dt.acc_location}, Kenya</p>
                                </span>
                                <h3>{dt.acc_name}</h3>
                                <p>{dt.ammenities}</p>
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

export default Categorical;
