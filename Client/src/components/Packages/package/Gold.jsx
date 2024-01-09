
import "../Bookings.css";
import { useEffect, useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Gold = () => {
    const [accTypeList, setAccTypeList] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedChoices, setSelectedChoiices] = useState([]);

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

    useEffect(() => {
        listOfAccTypes();
        listOfLocations();
    }, []);

    const handleCheckBoxChange = (value) => {
        const newSelectedChoices = [...selectedChoices];
        if (newSelectedChoices.includes(value)) {
            const index = newSelectedChoices.indexOf(value);
            newSelectedChoices.splice(index, 1);
        } else if (newSelectedChoices.length < 3) {
            newSelectedChoices.push(value)
        }
        setSelectedChoiices(newSelectedChoices);
    };

    return (
        <div>
            <h3>This package entails to a two custom locations</h3>
            <h4>You will get a chance to choose atleast 3 sites of your choice per location.</h4>
            <form>
                <div>
                    <label>Locations : </label>
                    <div className="location-boxes full-div">
                        {
                            locations.map((l, i) => (
                                <div key={i} className="checkboxes flex-container">
                                    <input type="checkbox" value={`${l.locationName}`}
                                        onChange={() => handleCheckBoxChange(`${l.locationName}`)}
                                    />
                                    <p>{l.locationName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <label>Accomodation type : </label>
                    <select>
                        <option>choose accomodation</option>
                        {
                            accTypeList.map((a, i) => (
                                <option value={`${a.accomodationType}`} key={i}>{a.accomodationType}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label>Number of People : </label>
                    <input type="number" />
                </div>
                <input type="submit" value='submit' />
            </form>
        </div>
    )
};

export default Gold;
