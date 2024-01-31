
import "./Contact.css";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { HiMailOpen } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Contact = () => {
    const [message, setMessage] = useState({
        fullname: "",
        email: "",
        msg: ""
    });

    const [comments, setComments] = useState({
        comment: "",
        user: ""
    })

    const [label, setLabel] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setMessage({ ...message, [input.name]: input.value });
    };

    const handleComments = ({ currentTarget: input }) => {
        setComments({ ...comments, [input.name]: input.value });
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios(`${url_api}/contacts/msg`, {
                data: message,
                method: "POST",
            });
            setLabel(res.data)
            if (res.data.success == "true") {
                await success("Your message has been sent successfully");
                setMessage({ fullname: "", email: "", msg: "" });
            }
        } catch (err) {
            await connections()
        };
    };

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        try {
            if (token != null) {
                const res = await axios(`${url_api}/contacts/comment`, {
                    data: comments,
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })
                // setLabel(res.data)
                if (res.data.success == "true") {
                    await success("your comment was received successfully");
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 2000);
                }
            } else {
                const response = await alertMsg("To submit a comment you have to be signed in. Proceed to Sign In", "Yes");
                if (response.isConfirmed) {
                    window.location.href = "/forms";
                }
            }
        } catch (err) {
            await connections()
        };
    };

    const alertMsg = (text, btn) => {
        const res = Swal.fire({
            title: "Safari Adventure",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: btn,
            background: "#0a1930",
            color: "#cbdaf7"
        });
        return res;
    };

    const connections = () => {
        Swal.fire({
            title: "Safari Adventure",
            text: "Check your connection",
            icon: "error", //question, error
            background: "#0a1930",
            color: "#cbdaf7"
        })
    }
    const success = (text) => {
        Swal.fire({
            title: "Safari Adventure",
            text: text,
            icon: "success", //question, error
            showConfirmButton: false,
            timer: 1500,
            background: "#0a1930",
            color: "#cbdaf7"
        })
    }

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
                <p className="label" id={`${label.success}`}>{label.message}</p>
                <div className="choose-forms-btn flex-container">
                    <button onClick={toggleForms} className="mailbtnform stylebtn">mail us</button>
                    <button onClick={toggleForms2} className="commentbtnform">comments</button>
                </div>
                <div className="forms-container full-div">
                    <form className="full-div flex-container contact-form" onSubmit={() => handleSubmit(event)}>
                        <div className="grid full-div">
                            <input
                                type="text"
                                placeholder="Full Name*"
                                required
                                name="fullname"
                                value={message.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address*"
                            required
                            name="email"
                            value={message.email}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Message*"
                            cols={10}
                            rows={10}
                            required
                            name="msg"
                            value={message.msg}
                            onChange={handleChange}
                        ></textarea>
                        <input type="submit" value="Send Us Message" />
                    </form>
                    <form className="comments-form flex-container full-div" onSubmit={() => handleSubmitComment(event)}>
                        <textarea
                            placeholder="place your comment here...*"
                            cols={15}
                            rows={10}
                            required
                            name="comment"
                            onChange={handleComments}
                        ></textarea>
                        <input type="submit" value="send comment" />
                    </form>
                </div>
            </div>
        </div >
    )
};

export default Contact;
