
import { useEffect, useState } from "react";
import "./Sites.css";
import { FiPlus } from "react-icons/fi";
import { TiCamera } from "react-icons/ti";
import { GiCrossMark, GiPencil } from "react-icons/gi";
import Form from "./Form";
import axios from "axios";
import { CiTrash } from "react-icons/ci";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Sites = () => {
    const [isToggle, setToggle] = useState(false);
    const [sites, setSites] = useState([]);
    const { id } = useParams();
    const [msg, setMsg] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [images, setImages] = useState([]);
    const [updateData, setUpdateData] = useState({
        destination_name: "",
        activities: "",
        description: "",
        dest_map: ""
    });

    const toggleFloat = () => {
        setToggle(!isToggle);
    };
    const toggleFloatB = (data) => {
        setIsActive(!isActive);
        setUpdateData(data);
        setImages(data.pictures)
    };

    const handleChange = ({ currentTarget: input }) => {
        setUpdateData({ ...updateData, [input.name]: input.value });
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("destination_name", updateData.destination_name);
            formData.append("activities", updateData.activities);
            formData.append("description", updateData.description);
            formData.append("dest_map", updateData.dest_map);
            formData.append("id", updateData._id)
            const res = await axios({
                method: "patch",
                url: `${url_api}/sites/sites`,
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

    const listOfSites = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/sites/sitelists/${id}`,
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setSites(res.data.sites);
            if (res.data.success == "true") {
                window.location.reload(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteSite = async (name, id) => {
        try {
            const confirm = await alertMsg(`Confirm Deletion of ${name} from DB`, "Yes");
            if (confirm.isConfirmed) {
                const res = await axios({
                    method: "delete",
                    url: `${url_api}/sites/sites/`,
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

    useEffect(() => {
        listOfSites();
    }, []);

    return (
        <div className="all-destination">
            <div className="float" id={`${isToggle}`}>
                <GiCrossMark className="close" onClick={toggleFloat} />
                <Form />
            </div>
            <div className="float floatB" id={`${isActive}`}>
                <GiCrossMark className="close" onClick={toggleFloatB} />
                <form className="admin-form dest-form" onSubmit={() => handleSubmit(event)}>
                    <h4 className="response" id={`${msg.success}`}>{msg.message}</h4>
                    <div className="file-container flex-container full-div">
                        <div className="cover-img imgs2" id="mlimgs">
                            {
                                images ? (
                                    images.map((img, index) => (
                                        <img src={`${url_api}${img}`} className="full-div" key={index} />
                                    ))
                                ) : ("")
                            }
                        </div>
                        <label htmlFor="pkgImg">
                            <TiCamera className="cam" />
                        </label>
                        <input
                            type="file"
                            id="pkgImg"
                            name="destinationPic"
                            className="multiFileInput"
                            multiple
                        />
                        <textarea
                            placeholder="Map URL"
                            name="dest_map"
                            value={updateData.dest_map}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="other-inputs flex-container full-div">
                        <input
                            type="text"
                            placeholder="Destination Name"
                            name="destination_name"
                            value={updateData.destination_name}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Activities done"
                            name="activities"
                            value={updateData.activities}
                            onChange={handleChange}
                        ></textarea>
                        <textarea
                            placeholder="Brief information about the destination"
                            name="description"
                            value={updateData.description}
                            onChange={handleChange}
                        ></textarea>
                        <input type="submit" value="update destination" />
                    </div>
                </form>
            </div>
            <div className="top-bar flex-container">
                <h3>List of destinations</h3>
                <button className="admin-btn new flex-container" onClick={toggleFloat}>
                    new
                    <FiPlus className="add-new" />
                </button>
            </div>
            <div className="dst-list full-div grid-container">
                {
                    sites.length > 0 ? (
                        sites.map((site, index) => (
                            <div className="site_card" key={index}>
                                <div className="trash grid-container">
                                    <CiTrash onClick={() => deleteSite(`${site.destination_name}`, `${site._id}`)} />
                                </div>
                                <div className="edit grid-container">
                                    <GiPencil onClick={() => toggleFloatB(site)} />
                                </div>
                                <img src={`${url_api}${site.pictures[0]}`} alt={site.destination_name} className="full-div" />
                                <p>{site.destination_name}</p>
                            </div>)
                        )) : ("")
                }
            </div>
        </div>
    )
};

export default Sites;
