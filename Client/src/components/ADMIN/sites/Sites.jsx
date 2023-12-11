
import { useEffect, useState } from "react";
import "./Sites.css";
import { FiPlus } from "react-icons/fi";
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
    console.log(id)

    const toggleFloat = () => {
        setToggle(!isToggle);
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
                                {console.log(site.pictures[0])}
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
