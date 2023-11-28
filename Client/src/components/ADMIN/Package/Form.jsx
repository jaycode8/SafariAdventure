
// import "./Form.css"
import locImg from "../../../resources/me.webp";
import { TiCamera } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Form = () => {
    const [file, setFile] = useState(null);
    const [pkg, setPkg] = useState({
        title: "",
        price: "",
        description: ""
    });
    const [msg, setMsg] = useState({});

    const fileChange = (event) => {
        const image = event.target.files[0];
        setFile(image);
        document.getElementById("pkgimagefile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setPkg({ ...pkg, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", pkg.title);
            formData.append("price", pkg.price);
            formData.append("description", pkg.description);
            formData.append("packagePic", file);
            const res = await axios({
                method: "post",
                url: `${url_api}/packages/packages`,
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
                    <img src={locImg} className="full-div" id="pkgimagefile" />
                </div>
                <label htmlFor="pkgImg">
                    <TiCamera className="cam" />
                </label>
                <input
                    type="file"
                    id="pkgImg"
                    name="PackagePic"
                    onChange={fileChange}
                />
            </div>
            <div className="other-inputs flex-container full-div">
                <input
                    type="text"
                    placeholder="Package Title"
                    name="title"
                    onChange={handleChange}
                />
                <input
                    type="number"
                    placeholder="Package Price"
                    name="price"
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Brief infor"
                    name="description"
                    onChange={handleChange}
                ></textarea>
                <input type="submit" value="submit package" />
            </div>
        </form>
    )
};

export default Form;

