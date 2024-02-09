
import "./Footer.css";
import kws from "../../resources/sponsors/kws.png";
import kq from "../../resources/sponsors/kq.png";
import naivas from "../../resources/sponsors/naivas.png";
import forests from "../../resources/sponsors/forests.png";
import kempinski from "../../resources/sponsors/kempinski.png";
import cocacola from "../../resources/sponsors/cocacola.png";
import aga from "../../resources/sponsors/aga.png";
import nrb from "../../resources/sponsors/nrb.png";
import cic from "../../resources/sponsors/cic.png";

const Footer = () => {
    const currentPath = window.location.pathname;
    const basePath = currentPath.split("/")[1];

    const patners = [kws, forests, kq, kempinski, naivas, cocacola, aga, nrb, cic];

    return (
        <div>
            {
                basePath == "dashboard" ? ("") : (
                    <div className="footer" id="footer">
                        <div className="footer-section grid-container full-div">
                            <h3>Our patners</h3>
                            <div className="partners grid-container">
                                {
                                    patners.map((patner, index) => (
                                        <div className="logos" key={index}>
                                            <img src={patner} className="full-div" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div >
                        <div className="copyright grid-container">
                            <span className="flex-container">
                                &copy;<small> {new Date().getFullYear()}</small>
                                <a href="https://jamesmumo.vercel.app/" target="_blank"> JayTech </a> | All Rights Reserved.
                            </span>
                        </div>
                    </div >
                )
            }
        </div>
    )


};

export default Footer;
