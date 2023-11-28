
import locImg from "../../../resources/me.webp";
import { TiCamera } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Form = () => {
    const [file, setFile] = useState(null);
    const [accomodation, setAccomodation] = useState({
        type: "",
    });
    const [msg, setMsg] = useState({});

    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        document.getElementById("accomodationfile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setAccomodation({ ...accomodation, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("accomodationType", accomodation.type);
            formData.append("accomodationPic", file);
            const res = await axios({
                method: "post",
                url: `${url_api}/accomodations/types`,
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
                    <img src={locImg} className="full-div" id="accomodationfile" />
                </div>
                <label htmlFor="accomodationImg">
                    <TiCamera className="cam" />
                </label>
                <input
                    type="file"
                    id="accomodationImg"
                    name="accomodationPic"
                    onChange={fileChange}
                />
            </div>
            <div className="other-inputs flex-container full-div">
                <input
                    type="text"
                    placeholder="Accomodation Type"
                    name="type"
                    onChange={handleChange}
                />
                <input type="submit" value="submit accomodation type" />
            </div>
        </form>
    )
};

export default Form;
