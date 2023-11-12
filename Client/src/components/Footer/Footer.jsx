
import "./Footer.css";
import { BiLogoFacebook } from "react-icons/bi";
import { RxInstagramLogo } from "react-icons/rx";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-section grid-container full-div">
                <div className="aboutUs">
                    <h4>about us</h4>
                    <p>
                        At SafariAdventure, we are passionate about showcasing the breathtaking beauty and diverse wonders of Kenya. With years of experience and deep love for this remarkable land, our team is dedicated to crafting unforgattable journeys for travellers from around the world.
                    </p>
                </div>
                <div className="mission">
                    <h4>our mission</h4>
                    <p>
                        We are committed to providing travellors with enriching experiences that go beyond the ordinary. Our mission is to create exceptional adventures that celebrate Kenya's extraodinary wildlife, culture and landscapes while preserving its natural heritage.
                    </p>
                </div>
                <div className="contacts">
                    <h4>contact</h4>
                    <p>SafariAdventure address<br />4th street Tom Mboya Avenue, Nairobi</p>
                    <p>+254 71200000000</p>
                    <p>safariadventure@yahoo.com</p>
                    <span>
                        <BiLogoFacebook className="social-icon" />
                        <RxInstagramLogo className="social-icon" />
                    </span>
                </div>
            </div>
            <div className="copyright grid-container">
                <span className="flex-container">
                    &copy;<small> {new Date().getFullYear()}</small>
                    <a href="https://james-mumo.web.app"> JayTech </a> | All Rights Reserved.
                </span>
            </div>
        </div>
    )
};

export default Footer;
