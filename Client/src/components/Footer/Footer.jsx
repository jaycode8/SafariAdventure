
import "./Footer.css";

const Footer = () => {
    const currentPath = window.location.pathname;
    const basePath = currentPath.split("/")[1];
    return (
        <div>
            {
                basePath == "dashboard" ? ("") : (
                    <div className="footer" id="footer">
                        <div className="footer-section grid-container full-div">
                            <div className="partners">hey</div>
                        </div >
                        <div className="copyright grid-container">
                            <span className="flex-container">
                                &copy;<small> {new Date().getFullYear()}</small>
                                <a href="https://james-mumo.web.app" target="_blank"> JayTech </a> | All Rights Reserved.
                            </span>
                        </div>
                    </div >
                )
            }
        </div>
    )


};

export default Footer;
