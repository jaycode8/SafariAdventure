
import "./Form.css"
import { TiCamera } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Form = () => {
    const [file, setFile] = useState(null);
    const [loc, setLoc] = useState({
        locationName: "",
    });
    const [msg, setMsg] = useState({});

    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        document.getElementById("imagefile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setLoc({ ...loc, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("locationName", loc.locationName);
            formData.append("location_pic", file);
            const res = await axios({
                method: "post",
                url: `${url_api}/locations/locations`,
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
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="admin-form" onSubmit={() => handleSubmit(event)}>
            <h4 className="response" id={`${msg.success}`}>{msg.message}</h4>
            <div className="file-container flex-container full-div">
                <div className="cover-img">
                    <img src="" className="full-div" id="imagefile" />
                </div>
                <label htmlFor="locationImg">
                    <TiCamera className="cam" />
                </label>
                <input
                    type="file"
                    id="locationImg"
                    name="locationPic"
                    accept="image/*"
                    onChange={fileChange}
                />
            </div>
            <div className="other-inputs flex-container full-div">
                <input
                    type="text"
                    placeholder="Location name"
                    name="locationName"
                    onChange={handleChange}
                />
                <input type="submit" value="submit location" />
            </div>
        </form>
    )
};

export default Form;
