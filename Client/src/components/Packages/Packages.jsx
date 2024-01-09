
import "./Packages.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Glider from "react-glider";
import 'glider-js/glider.min.css';
import "react-glider/glider.defaults.css";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Packages = () => {
    const [pkgList, setPkgList] = useState([]);
    const listOfPackages = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/packages/pkglist/`,
            });
            setPkgList(res.data.packages);
        } catch (err) {
            console.log(err);
        }
    };

    const currentWidth = window.innerWidth;
    let slides = currentWidth >= 500 ? (currentWidth >= 1000 ? "3" : "2") : "1";

    useEffect(() => {
        listOfPackages();
    }, []);

    return (
        <div className="packages" id="packages">
            <div className="row-container">
                <div className="coll-1 grid-container">
                    <span className="grid-container">
                        <h3>why choose us?</h3>
                        <h2>Let us show you the beauty of Kenya</h2>
                        <Link className="link">Book now</Link>
                    </span>
                </div>
                <h3>Checkout Our Packages</h3>
                <div className="coll-2 grid-container">
                    <Glider
                        draggable
                        hasArrows
                        hasDots
                        slidesToShow={slides}
                        slidesToScroll={1}
                    >
                        {
                            pkgList.map((pkg, index) => (
                                <Link className="package-card" key={index} to={`/package/${pkg.title}`}>
                                    <img src={`${url_api}${pkg.packagePic}`} className="full-div" />
                                    <div className="card-content full-div grid-container">
                                        <div className="type">
                                            <h2>{pkg.title}</h2>
                                            <h4>ksh. {pkg.price}</h4>
                                        </div>
                                        <p className="full-div">{pkg.description}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </Glider>
                </div>
            </div>
        </div>
    )
};

export default Packages;
