
import { TiCamera } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Form = () => {
    const [files, setFiles] = useState([]);
    const [accomodation, setAccomodation] = useState({
        acc_location: "",
        acc_name: "",
        ammenities: "",
        description: "",
        map: ""
    });
    const [msg, setMsg] = useState({});
    const { id } = useParams()

    const fileChange = (event) => {
        const images = event.target.files;
        setFiles(images);
    };

    const handleChange = ({ currentTarget: input }) => {
        setAccomodation({ ...accomodation, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("acc_name", accomodation.acc_name);
            formData.append("acc_location", accomodation.acc_location);
            formData.append("ammenities", accomodation.ammenities);
            formData.append("description", accomodation.description);
            formData.append("acc_type", id);
            formData.append("acc_map", accomodation.map);
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
            const res = await axios({
                method: "post",
                url: `${url_api}/accomodations/acc`,
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


    const renderImages = () => {
        const imageElements = [];
        for (let i = 0; i < files.length; i++) {
            const image = files[i];
            imageElements.push(<img src={URL.createObjectURL(image)} key={i} />);
        }
        return imageElements;
    }
    return (
        <form className="admin-form dest-form" onSubmit={() => handleSubmit(event)}>
            <h4 className="response" id={`${msg.success}`}>{msg.message}</h4>
            <div className="file-container flex-container full-div">
                <div className="cover-img" id="mlimgs">
                    {
                        renderImages()
                    }
                </div>
                <label htmlFor="accImg">
                    <TiCamera className="cam" />
                </label>
                <input
                    type="file"
                    id="accImg"
                    name="image"
                    className="multiFileInput"
                    multiple
                    accept="image/*"
                    onChange={fileChange}
                />
                <textarea
                    placeholder="Map URL"
                    name="map"
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="other-inputs flex-container full-div">
                <input
                    type="text"
                    placeholder="Accomodation Name"
                    name="acc_name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Accomodation Location"
                    name="acc_location"
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Available ammenities"
                    name="ammenities"
                    onChange={handleChange}
                ></textarea>
                <textarea
                    placeholder="Brief description about the accomodation"
                    name="description"
                    onChange={handleChange}
                ></textarea>
                <input type="submit" value="submit accomodation" />
            </div>
        </form>
    )
};

export default Form;

