
import { useEffect, useState } from "react";
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

const AccomodationTypes = () => {
    const [file, setFile] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [accTypeList, setAccTypeList] = useState([]);
    const [msg, setMsg] = useState({});
    const [data, setData] = useState({
        accomodationType: "",
    });

    const toggleFloat = () => {
        setToggle(!isToggle);
    };

    const toggleFloatB = (data) => {
        setIsActive(!isActive);
        setData(data);
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

    const listOfAccTypes = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/accomodations/typelists/`,
            });
            setAccTypeList(res.data.types);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfAccTypes();
    }, []);

    const deleteType = async (name, id) => {
        try {
            const confirm = await alertMsg(`Confirm Deletion of ${name} and its associated accomodations from DB`, "Yes");
            if (confirm.isConfirmed) {
                const res = await axios({
                    method: "delete",
                    url: `${url_api}/accomodations/types/`,
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
        document.getElementById("accfile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const confirm = await alertMsg(`Confirm updating this accomodation type`, "Yes");
            if (confirm.isConfirmed) {
                const formData = new FormData();
                formData.append("accomodationType", data.accomodationType);
                formData.append("id", data._id)
                if (file) {
                    formData.append("accomodationPic", file);
                }
                const res = await axios({
                    method: "patch",
                    url: `${url_api}/accomodations/types/`,
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
        <div className="location" id="accomodation">
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
                            <img src={`${url_api}${data.accomodationPic}`} className="full-div" id="accfile" />
                        </div>
                        <label htmlFor="accImgs">
                            <TiCamera className="cam" />
                        </label>
                        <input
                            type="file"
                            id="accImgs"
                            name="accomodationPic"
                            onChange={fileChange}
                        />
                    </div>
                    <div className="other-inputs flex-container full-div">
                        <input
                            type="text"
                            placeholder="Accomodation Type"
                            name="accomodationType"
                            value={data.accomodationType}
                            onChange={handleChange}
                        />
                        <input type="submit" value="update Accomodation Type" />
                    </div>
                </form>
            </div>
            <div className="head flex-container">
                <h3>Accomodation Types</h3>
                <button className="admin-btn new flex-container" onClick={toggleFloat}>
                    new
                    <FiPlus className="add-new" />
                </button>
            </div>
            <div className="location-list full-div grid-container">
                {
                    accTypeList.map((data, index) => (
                        <div className="l-card" key={index}>
                            <div className="pencil grid-container">
                                <GiPencil onClick={() => toggleFloatB(data)} />
                            </div>
                            <div className="trash grid-container">
                                <CiTrash onClick={() => deleteType(`${data.accomodationType}`, `${data._id}`)} />
                            </div>
                            <Link to={`accomodation/${data._id}`}>
                                <img src={`${url_api}${data.accomodationPic}`} className="full-div" />
                                <div className="l-info">
                                    <h3>{data.accomodationType}</h3>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >
    )
};

export default AccomodationTypes;
