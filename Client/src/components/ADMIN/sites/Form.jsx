
import "./Form.css"
import { TiCamera } from "react-icons/ti";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken")

const Form = () => {
    const [files, setFiles] = useState([]);
    const [destination, setDestination] = useState({
        destination_location: "",
        destination_name: "",
        activities: "",
        description: "",
        map: ""
    });
    const [msg, setMsg] = useState({});
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState([]);
    const { id } = useParams();

    const fileChange = (event) => {
        const images = event.target.files;
        setFiles(images);
    };

    const handleChange = ({ currentTarget: input }) => {
        setDestination({ ...destination, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("destination_name", destination.destination_name);
            formData.append("destination_location", destination.destination_location);
            formData.append("activities", destination.activities);
            formData.append("description", destination.description);
            formData.append("dest_map", destination.map);
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
            const res = await axios({
                method: "post",
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

    const fetchLocation = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/locations/loc/${id}`,
            });
            setLocation(res.data.location);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        listOfLocations();
        fetchLocation();
    }, []);

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
                <div className="cover-img imgs2" id="mlimgs">
                    {
                        renderImages()
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
                    accept="image/*"
                    multiple
                    onChange={fileChange}
                />
                <textarea
                    placeholder="Map URL"
                    name="map"
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="other-inputs flex-container full-div">
                <select required name="destination_location" onChange={handleChange}>
                    <option value="">choose location</option>
                    {
                        locations.map((data, index) => (
                            <option key={index} value={data._id}>{data.locationName}</option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    placeholder="Destination Name"
                    name="destination_name"
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Activities done"
                    name="activities"
                    onChange={handleChange}
                ></textarea>
                <textarea
                    placeholder="Brief information about the destination"
                    name="description"
                    onChange={handleChange}
                ></textarea>
                <input type="submit" value="submit destination" />
            </div>
        </form>
    )
};

export default Form;

