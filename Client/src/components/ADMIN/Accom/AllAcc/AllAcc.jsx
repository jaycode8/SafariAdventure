
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { GiCrossMark, GiPencil } from "react-icons/gi";
import Form from "./Form";
import axios from "axios";
import { CiTrash } from "react-icons/ci";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { TiCamera } from "react-icons/ti";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const AllAcc = () => {
    const [isToggle, setToggle] = useState(false);
    const [accomodations, setAccomodations] = useState([]);
    const { id } = useParams();
    const [isActive, setIsActive] = useState(false);
    const [images, setImages] = useState([]);
    const [updateData, setUpdateData] = useState({
        acc_name: "",
        acc_location: "",
        description: "",
        acc_map: "",
        ammenities: ""
    });
    const [msg, setMsg] = useState({});

    const toggleFloat = () => {
        setToggle(!isToggle);
    };

    const toggleFloatB = (data) => {
        setIsActive(!isActive);
        setUpdateData(data);
        setImages(data.pictures);
    };

    const handleChange = ({ currentTarget: input }) => {
        setUpdateData({ ...updateData, [input.name]: input.value });
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

    const listOfAccomodations = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/accomodations/lists/${id}`
            });
            setAccomodations(res.data.accomodation);
            // setAccType(res.data.type)
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("acc_name", updateData.acc_name);
            formData.append("acc_location", updateData.acc_location);
            formData.append("ammenities", updateData.ammenities);
            formData.append("description", updateData.description);
            formData.append("acc_map", updateData.acc_map);
            formData.append("id", updateData._id)
            const res = await axios({
                method: "patch",
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

    const deleteAccomodation = async (name, id) => {
        try {
            const confirm = await alertMsg(`Confirm Deletion of ${name} from DB`, "Yes");
            if (confirm.isConfirmed) {
                const res = await axios({
                    method: "delete",
                    url: `${url_api}/accomodations/acc`,
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
        listOfAccomodations();
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
                                        <img src={`${img}`} className="full-div" key={index} />
                                    ))
                                ) : ("")
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
                        />
                        <textarea
                            placeholder="Map URL"
                            name="acc_map"
                            value={updateData.acc_map}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="other-inputs flex-container full-div">
                        <input
                            type="text"
                            placeholder="Accomodation Name"
                            name="acc_name"
                            value={updateData.acc_name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Accomodation Location"
                            name="acc_location"
                            value={updateData.acc_location}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Available ammenities"
                            name="ammenities"
                            value={updateData.ammenities}
                            onChange={handleChange}
                        ></textarea>
                        <textarea
                            placeholder="Brief description about the accomodation"
                            name="description"
                            value={updateData.description}
                            onChange={handleChange}
                        ></textarea>
                        <input type="submit" value="update accomodation" />
                    </div>
                </form>
            </div>
            <div className="top-bar flex-container">
                <h3>List of accomodations</h3>
                <button className="admin-btn new flex-container" onClick={toggleFloat}>
                    new
                    <FiPlus className="add-new" />
                </button>
            </div>
            <div className="dst-list full-div grid-container">
                {
                    accomodations.map((data, index) => (
                        <div className="site_card" key={index}>
                            <div className="trash grid-container">
                                <CiTrash onClick={() => deleteAccomodation(`${data.acc_name}`, `${data._id}`)} />
                            </div>
                            <div className="edit grid-container">
                                <GiPencil onClick={() => toggleFloatB(data)} />
                            </div>
                            <img src={`${data.pictures[0]}`} alt={data.acc_name} className="full-div" />
                            <p>{data.acc_name}</p>
                        </div>)
                    )
                }
            </div>
        </div>
    )
};

export default AllAcc;
