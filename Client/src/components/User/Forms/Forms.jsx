import React, { useState } from "react";
import "./Forms.css";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import avatar from "../../../resources/images/avatar.jpeg";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Forms = () => {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState("");
    const [user, setUser] = useState({
        username: "",
        email: "",
        gender: "",
        password: "",
    });
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");

    const [logUser, setLogUser] = useState({
        uname: "",
        passw: "",
    });

    const handleChange = ({ currentTarget: input }) => {
        setUser({ ...user, [input.name]: input.value });
    };

    const handlePhoneChange = (value, country) => {
        let formatedNumber = value.replace(/^(\d+?)(0)(\d+)$/, "$1$3");
        setPhone(formatedNumber);
        setCountry(country.name);
    };

    const handleLogChange = ({ currentTarget: input }) => {
        setLogUser({ ...logUser, [input.name]: input.value });
    };

    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        document.getElementById("imgDisplay").src = URL.createObjectURL(image);
    };



    const toggleForm = () => {
        const container = document.querySelector(".container");
        container.classList.contains("right-panel-active")
            ? container.classList.remove("right-panel-active")
            : container.classList.add("right-panel-active");
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const res = await axios(`${url_api}/users/signin`, {
                data: logUser,
                method: "POST",
            });
            //setResponse(res.data);
            if (res.data.success == "true") {
                localStorage.setItem("DRFAuthToken", res.data.token);
                await success("You have successfully signed In");
                setTimeout(() => {
                    if (res.data.user == "superuser") {
                        window.location.href = "/dashboard";
                    } else {
                        window.location.href = "/";
                    }
                }, 2000);
            } else {
                await alertMsg(res.data.message)
            }
        } catch (error) {
            await alertMsg("Something went wrong")
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("phone", phone);
            formData.append("country", country);
            formData.append("gender", user.gender);
            formData.append("profile", file);
            const res = await axios(`${url_api}/users/signup`, {
                method: "post",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // setResponse(res.data);
            if (res.data.success == "true") {
                await success(`We have sent a verification code to ${user.email}`);
                setTimeout(() => {
                    window.location = "/verify";
                }, 2000);
            }else {
                await alertMsg(res.data.message)
            }
        } catch (error) {
            await alertMsg("Something went wrong")
        }
    };

    const alertMsg = (text) => {
        Swal.fire({
            title: "Safari Adventure",
            text: text,
            icon: "warning",
            background: "#0a1930",
            color: "#cbdaf7"
        });
    };

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
        <div className="forms">
            <span className={`msg ${response.success}`}>{response.message}</span>
            <div className="container right-panel-active">
                <div className="container__form container--signup">
                    <form className="form" id="form1" onSubmit={handleSignIn}>
                        <h2 className="form__title">Login</h2>
                        <p>Sign in to access your account</p>
                        <input
                            type="text"
                            placeholder="Username"
                            className="input"
                            name="uname"
                            onChange={handleLogChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            name="passw"
                            onChange={handleLogChange}
                            required
                        />
                        <div className="remember">
                            <input
                                type="checkbox"
                                id="check"
                            />
                            <label htmlFor="check">Remember me</label>
                        </div>
                        <button className="btn" type="submit">
                            Sign In
                        </button>
                    </form>

                    <div className="outer_btns">
                        <a href="#" className="page_links">forgot password?</a>
                        <span>
                            Don't have account?
                            <a onClick={toggleForm} className="page_links">Register</a>
                        </span>
                    </div>
                </div>

                <div className="container__form container--signin">
                    <form className="form form2" id="form2" onSubmit={handleSignUp}>
                        <h2 className="form__title">Sign Up</h2>
                        <div className="image_section">
                            <span className="grids">
                                <img src={avatar} alt="avatar" id="imgDisplay" />
                            </span>
                            <label htmlFor="profile">
                                <svg
                                    className="icon"
                                    enableBackground="new 0 0 32 32"
                                    height="32px"
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 32 32"
                                    width="1rem"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <g id="camera">
                                        <path
                                            clipRule="evenodd"
                                            d="M16,10.001c-4.419,0-8,3.581-8,8c0,4.418,3.581,8,8,8   c4.418,0,8-3.582,8-8C24,13.583,20.418,10.001,16,10.001z M20.555,21.906c-2.156,2.516-5.943,2.807-8.459,0.65   c-2.517-2.156-2.807-5.944-0.65-8.459c2.155-2.517,5.943-2.807,8.459-0.65C22.42,15.602,22.711,19.391,20.555,21.906z"
                                            fill="#333333"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M16,14.001c-2.209,0-3.999,1.791-4,3.999v0.002   c0,0.275,0.224,0.5,0.5,0.5s0.5-0.225,0.5-0.5V18c0.001-1.656,1.343-2.999,3-2.999c0.276,0,0.5-0.224,0.5-0.5   S16.276,14.001,16,14.001z"
                                            fill="#333333"
                                            fillRule="evenodd"
                                        />
                                        <path
                                            clipRule="evenodd"
                                            d="M29.492,9.042l-4.334-0.723l-1.373-3.434   C23.326,3.74,22.232,3,21,3H11C9.768,3,8.674,3.74,8.214,4.886L6.842,8.319L2.509,9.042C1.055,9.283,0,10.527,0,12v15   c0,1.654,1.346,3,3,3h26c1.654,0,3-1.346,3-3V12C32,10.527,30.945,9.283,29.492,9.042z M30,27c0,0.553-0.447,1-1,1H3   c-0.553,0-1-0.447-1-1V12c0-0.489,0.354-0.906,0.836-0.986l5.444-0.907l1.791-4.478C10.224,5.25,10.591,5,11,5h10   c0.408,0,0.775,0.249,0.928,0.629l1.791,4.478l5.445,0.907C29.646,11.094,30,11.511,30,12V27z"
                                            fill="#333333"
                                            fillRule="evenodd"
                                        />
                                    </g>
                                </svg>
                            </label>
                            <input
                                type="file"
                                name="img"
                                id="profile"
                                onChange={fileChange}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="User Name"
                            className="input"
                            name="username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="input"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                        <PhoneInput
                            country={"ke"}
                            value={phone}
                            inputClass="phoneInput"
                            containerClass="phoneContainer"
                            inputStyle={{ border: 0 }}
                            dropdownStyle={{
                                color: "#121212",
                                display: "grid",
                                placeItems: "flex-start",
                                padding: "0 .5rem",
                                position: "absolute",
                            }}
                            required
                            name="phone"
                            onChange={handlePhoneChange}
                        />
                        <span className="gender-container">
                            <span>
                                <input
                                    type="radio"
                                    value={1}
                                    name="gender"
                                    id="male"
                                    onChange={handleChange}
                                />
                                <label htmlFor="male">Male</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    value={2}
                                    name="gender"
                                    id="female"
                                    onChange={handleChange}
                                />
                                <label htmlFor="female">Female</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    value={3}
                                    name="gender"
                                    id="other"
                                    onChange={handleChange}
                                />
                                <label htmlFor="other">other</label>
                            </span>
                        </span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <button className="btn signupbtn">Sign Up</button>
                    </form>
                    <div className="outer_btns">
                        <span>
                            Already have an account ?
                            <a onClick={toggleForm} className="page_links">Sign In</a>
                        </span>
                    </div>
                </div>
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <div className="overlay_text">
                                <h3>Wild Safari</h3>
                                <h4>Welcome to our platform !</h4>
                                <p>We are delighted to have you here and lookforward to sharing our content and services with you.</p>
                            </div>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <div className="overlay_text">
                                <h3>Wild Safari</h3>
                                <h4>Welcome to our platform !</h4>
                                <p>We are delighted to have you here and lookforward to sharing our content and services with you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forms;
