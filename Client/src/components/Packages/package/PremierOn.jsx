
import "../Bookings.css";
import { useEffect, useState } from "react";
import axios from "axios";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Premier = (user) => {
    const [accTypeList, setAccTypeList] = useState([]);

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
    console.log(user.user)

    return (
        <div>
            <h3>This package gives you a full week tour with us accross the country</h3>
            <h4>You will get a chance to choose atleast 5 sites of your choice per location.</h4>
            <form>
                <div>
                    <label>Locations : </label>
                    <input type="text" value="unlocked all locations" />
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

export default Premier;
