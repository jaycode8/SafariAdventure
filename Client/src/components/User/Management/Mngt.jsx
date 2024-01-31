import { useEffect, useState } from "react";
import "./Mngt.css";
import axios from "axios";
import { FaPenFancy, FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Mngt = (token) => {
    const [user, setUser] = useState();
    const [editable, setEditable] = useState(true);
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setUser({ ...user, [input.name]: input.value });
    };

    const editInfor = () => {
        setEditable(!editable);
    };

    const fetchLogedUser = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/users/user`,
                headers: {
                    Authorization: `Token ${token.data}`,
                },
            });
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        token.data ? fetchLogedUser() : "";
    }, []);

    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        console.log(image)
        document.getElementById("img-data").src = URL.createObjectURL(image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await alertMsg("Confirm updating user information", "Update");
            if (response.isConfirmed) {
                const formData = new FormData();
                formData.append("username", user.username);
                formData.append("email", user.email);
                formData.append("phone", user.phone);
                if (file) {
                    formData.append("profile", file);
                }
                const res = await axios({
                    method: "PATCH",
                    url: `${url_api}/users/user`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Token ${token.data}`,
                    },
                });
                setResponse(res.data);
                if (res.data.success == "true") {
                    await success("User profile successfully updated");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                }
            }
        } catch (error) {
            console.log(error);
        }
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

    const logOut = async () => {
        const response = await alertMsg("Confirm logout session", "logOut");
        if (response.isConfirmed) {
            localStorage.removeItem("DRFAuthToken");
            window.location.href = "/";
        }
    };

    return (
        <div className="mngt full-div flex-container">
            <FaPenFancy className="penEdit" onClick={editInfor} />
            {user ? (
                <form className="full-div flex-container" onSubmit={handleSubmit}>
                    <div className="img-bag">
                        <img
                            src={`${url_api}/${user.profile}`}
                            className="full-div"
                            id="img-data"
                        />
                        <div className="cm-icon grid-container" id={`${editable}`}>
                            <label htmlFor="profile" className="uploadfile">
                                <FaCamera className="camera-icon" />
                                <p>Click to change</p>
                            </label>
                        </div>
                        <input type="file" name="img" id="profile" onChange={fileChange} />
                    </div>
                    <div className="user-info">
                        <div>
                            <label>Username : </label>
                            <input
                                type="text"
                                value={user.username}
                                name="username"
                                readOnly={editable}
                                className={`${editable}`}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Email : </label>
                            <input
                                type="email"
                                value={user.email}
                                className={`${editable}`}
                                name="email"
                                readOnly={editable}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Phone : </label>
                            <input
                                type="text"
                                value={user.phone}
                                name="phone"
                                className={`${editable}`}
                                readOnly={editable}
                                onChange={handleChange}
                            />
                        </div>
                        <div id={`${editable}`} className="country">
                            <label>Country : </label>
                            <input type="text" value={user.country} readOnly={true} />
                        </div>
                        <input type="submit" value="update" id={`${editable}`} />
                    </div>
                </form>
            ) : (
                ""
            )}
            <div className="log-btn full-div">
                <button className="logout" id={`${editable}`} onClick={logOut}>
                    LOG OUT
                </button>
            </div>
        </div>
    );
};

export default Mngt;
