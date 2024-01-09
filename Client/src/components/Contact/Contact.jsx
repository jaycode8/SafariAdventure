
import "./Contact.css";
import { FaPhoneSquareAlt, FaMailBulk } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { HiMailOpen } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";

const Contact = () => {
    const toggleForms = () => {
        document.querySelector(".comments-form").classList.remove("active");
        document.querySelector(".contact-form").style.transform = "translateX(0%)"
        document.querySelector(".commentbtnform").classList.remove("stylebtn")
        document.querySelector(".mailbtnform").classList.add("stylebtn")
    };
    const toggleForms2 = () => {
        document.querySelector(".contact-form").style.transform = "translateX(-100%)"
        document.querySelector(".comments-form").classList.add("active");
        document.querySelector(".commentbtnform").classList.add("stylebtn")
        document.querySelector(".mailbtnform").classList.remove("stylebtn")
    };

    return (
        <div className="contact full-div grid-container" id="contact">
            <div className="c-text full-div flex-container">
                <h2>Feel Free to Contact With Us</h2>
                <div className="c-icons full-div grid-container">
                    <span className="full-div flex-container phone">
                        <a href="tel:0726933261" className="full-div flex-container">
                            <FaPhoneSquareAlt className="ico full-div" />
                            <div className="full-div">
                                <h4>Phone</h4>
                                <p>+254 71200000000</p>
                            </div>
                        </a>
                    </span>
                    <span className="full-div flex-container email">
                        <a href="mailto:test@gmail.com" className="full-div flex-container">
                            <HiMailOpen className="ico full-divs" />
                            <div className="full-div">
                                <h4>Mail</h4>
                                <p>test@gmail.com</p>
                            </div>
                        </a>
                    </span>
                    <span className="full-div flex-container">
                        <BiCurrentLocation className="ico full-divs" />
                        <div className="full-div">
                            <h4>Location</h4>
                            <p>4th street Tom Mboya Avenue, Nairobi</p>
                        </div>
                    </span>
                    <span className="full-div flex-container">
                        <AiFillClockCircle className="ico full-divs" />
                        <div className="full-div">
                            <h4>Open</h4>
                            <p>8:00 am-5:00 pm</p>
                        </div>
                    </span>
                </div>
            </div>
            <div className="c-form full-div">
                <div className="choose-forms-btn flex-container">
                    <button onClick={toggleForms} className="mailbtnform stylebtn">mail us</button>
                    <button onClick={toggleForms2} className="commentbtnform">newsletter</button>
                </div>
                <div className="forms-container full-div">
                    <form className="full-div flex-container contact-form">
                        <div className="grid full-div">
                            <input type="text" placeholder="Full Name*" required />
                        </div>
                        <input type="email" placeholder="Email Address*" required />
                        <textarea placeholder="Message*" cols={10} rows={10} required></textarea>
                        <input type="submit" value="Send Us Message" />
                    </form>
                    <form className="comments-form flex-container full-div">
                        <h2>Join Our Community</h2>
                        <p>We love to travel and create some amaizing memories with our clients</p>
                        <input type="email" placeholder="Email Address*" required />
                        <input type="submit" value="Join Now" />
                    </form>
                </div>
            </div>
        </div >
    )
};

export default Contact;
