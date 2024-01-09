
import { useEffect, useState } from "react";
import "./Package.css";
import { FiPlus } from "react-icons/fi";
import { GiCrossMark, GiPencil } from "react-icons/gi";
import { CiTrash } from "react-icons/ci";
import { TiCamera } from "react-icons/ti";
import Form from "./Form";
import axios from "axios";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Package = () => {
    const [file, setFile] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [pkgList, setPkgList] = useState([]);
    const [msg, setMsg] = useState({});
    const [updateData, setUpdateData] = useState({
        title: "",
        price: "",
        description: ""
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

    const listOfPackages = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/packages/pkglist/`,
            });
            setPkgList(res.data.packages);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        listOfPackages();
    }, []);

    const deletePackage = async (name, id) => {
        try {
            const confirm = await alertMsg(`Confirm Deletion of ${name} from DB`, "Yes");
            if (confirm.isConfirmed) {
                const res = await axios({
                    method: "delete",
                    url: `${url_api}/packages/packages/`,
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
        document.getElementById("imgsfile").src = URL.createObjectURL(image);
    };

    const handleChange = ({ currentTarget: input }) => {
        setUpdateData({ ...updateData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const confirm = await alertMsg(`Confirm updating this package`, "Yes");
            if (confirm.isConfirmed) {
                const formData = new FormData();
                formData.append("title", updateData.title);
                formData.append("price", updateData.price);
                formData.append("description", updateData.description);
                formData.append("id", updateData._id)
                if (file) {
                    formData.append("packagePic", file);
                }
                const res = await axios({
                    method: "patch",
                    url: `${url_api}/packages/packages/`,
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
                <form className="grid-container admin-form" onSubmit={() => handleSubmit(event)}>
                    <h4 className="response" id={`${msg.success}`}>{msg.message}</h4>
                    <div className="file-container flex-container full-div">
                        <div className="cover-img">
                            <img src={`${url_api}${updateData.packagePic}`} className="full-div" id="imgsfile" />
                        </div>
                        <label htmlFor="pkgImgs">
                            <TiCamera className="cam" />
                        </label>
                        <input
                            type="file"
                            id="pkgImgs"
                            name="packagePic"
                            onChange={fileChange}
                        />
                    </div>
                    <div className="other-inputs flex-container full-div">
                        <input
                            type="text"
                            placeholder="Package Title"
                            name="title"
                            value={updateData.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Package Price"
                            name="price"
                            value={updateData.price}
                            onChange={handleChange}
                        />
                        <textarea
                            placeholder="Brief infor"
                            name="description"
                            value={updateData.description}
                            onChange={handleChange}
                        ></textarea>
                        <input type="submit" value="update package" />
                    </div>
                </form>
            </div>
            <div className="head flex-container">
                <h3>Packages</h3>
                <button className="admin-btn new flex-container" onClick={toggleFloat}>
                    new
                    <FiPlus className="add-new" />
                </button>
            </div>
            <div className="location-list full-div grid-container">
                {
                    pkgList.map((data, index) => (
                        <div className="l-card" key={index}>
                            <div className="pencil grid-container">
                                <GiPencil onClick={() => toggleFloatB(data)} />
                            </div>
                            <div className="trash grid-container">
                                <CiTrash onClick={() => deletePackage(`${data.title}`, `${data._id}`)} />
                            </div>
                            <img src={`${url_api}${data.packagePic}`} className="full-div" />
                            <div className="card-content full-div grid-container">
                                <div className="type">
                                    <h2>{data.title}</h2>
                                    <h4>{data.price}</h4>
                                </div>
                                <p className="full-div">{data.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
};

export default Package;
