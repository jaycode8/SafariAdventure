
import { useEffect, useState } from "react";
import "./Location.css";
import { FiPlus } from "react-icons/fi";
import { GiCrossMark, GiPencil } from "react-icons/gi";
import { CiTrash } from "react-icons/ci";
import { TiCamera } from "react-icons/ti";
import Form from "./Form";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Location = () => {
    const [file, setFile] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [locations, setLocations] = useState([]);
    const [msg, setMsg] = useState({});
    const [updateData, setUpdateData] = useState({
        locationName: "",
    });

    const toggleFloat = () => {
        setToggle(!isToggle);
    };

    const toggleFloatB = (data) => {
        setIsActive(!isActive);
        setUpdateData(data);
    };

    const alertMsg = (text, btn) => {
        const res = Swal.fire({
            title: "Wild Safari",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: btn,
        });
        return res;
    };

    const listOfLocations = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/locations/locationlists/`,
            });
            setLocations(res.data.locations);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfLocations();
    }, []);

    const deleteLocation = async (name, id) => {
        try {
            const confirm = await alertMsg(`Confirm Deletion of ${name} from DB`, "Yes");
            if (confirm.isConfirmed) {
                const res = await axios({
                    method: "delete",
                    url: `${url_api}/locations/locations/`,
                    data: { "id": id },
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (res.data.success == "true") {
                    window.location.reload(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        document.getElementById("imageFile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setUpdateData({ ...updateData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const confirm = await alertMsg(`Confirm updating this location`, "Yes");
            if (confirm.isConfirmed) {
                const formData = new FormData();
                formData.append("locationName", updateData.locationName);
                formData.append("id", updateData._id)
                if (file) {
                    formData.append("locationPic", file);
                }
                const res = await axios({
                    method: "patch",
                    url: `${url_api}/locations/locations/`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Token ${token}`,
                    },
                });
                setMsg(res.data);
                if (res.data.success == "true") {
                    window.location.reload(true);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="location">
            <div className="float" id={`${isToggle}`}>
                <GiCrossMark className="close" onClick={toggleFloat} />
                <Form />
            </div>
            <div className="float floatB" id={`${isActive}`}>
                <GiCrossMark className="close" onClick={toggleFloatB} />
                <form className="grid-container" onSubmit={() => handleSubmit(event)}>
                    <h4 className="response" id={`${msg.success}`}>{msg.message}</h4>
                    <div className="file-container flex-container full-div">
                        <div className="cover-img">
                            <img src={`${url_api}${updateData.locationPic}`} className="full-div" id="imageFile" />
                        </div>
                        <label htmlFor="locationImgs">
                            <TiCamera className="cam" />
                        </label>
                        <input
                            type="file"
                            id="locationImgs"
                            name="locationPic"
                            onChange={fileChange}
                        />
                    </div>
                    <div className="other-inputs flex-container full-div">
                        <input
                            type="text"
                            placeholder="Location name"
                            name="locationName"
                            value={updateData.locationName}
                            onChange={handleChange}
                        />
                        <input type="submit" value="submit location" />
                    </div>
                </form>
            </div>
            <div className="head flex-container">
                <h3>Available locations</h3>
                <button className="admin-btn new flex-container" onClick={toggleFloat}>
                    new
                    <FiPlus className="add-new" />
                </button>
            </div>
            <div className="location-list full-div grid-container">
                {
                    locations.map((data, index) => (
                        <Link to="/dashboard/msa">
                            <div className="l-card" key={index}>
                                <div className="pencil grid-container">
                                    <GiPencil onClick={() => toggleFloatB(data)} />
                                </div>
                                <div className="trash grid-container">
                                    <CiTrash onClick={() => deleteLocation(`${data.locationName}`, `${data._id}`)} />
                                </div>
                                <img src={`${url_api}${data.locationPic}`} className="full-div" />
                                <div className="l-info">
                                    <h3>{data.locationName}</h3>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div >
    )
};

export default Location;
