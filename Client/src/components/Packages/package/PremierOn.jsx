
import "../Bookings.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const Premier = (user, amount) => {
    const [accTypeList, setAccTypeList] = useState([]);
    const [packageData, setPackageData] = useState({
        locations: "All",
        accomodations: "",
        pples: ""
    });

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

    const valueChange = ({ currentTarget: input }) => {
        setPackageData({ ...packageData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const cost = user.amount * packageData.pples
            const res = await Swal.fire({
                title: "Safari Adventure",
                text: `Hey ${user.user.username}, confirm purchase of a ${user.pkgname} package at Ksh.${cost}.00`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "yes",
                background: "#0a1930",
                color: "#cbdaf7"
            });
            if (res.isConfirmed) {
                await Swal.fire({
                    title: "Safari Adventure",
                    text: "Package successfully purchased",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    background: "#0a1930",
                    color: "#cbdaf7"
                });
            }
        } catch (error) {
            await Swal.fire({
                title: "Safari Adventure",
                text: "An internal error has occured. Try again later",
                icon: "error",
                confirmButtonColor: "#3085d6",
                background: "#0a1930",
                color: "#cbdaf7"
            });
        }
    };

    return (
        <div>
            <h3>This package gives you a full week tour with us accross the country</h3>
            <h4>You will get a chance to choose atleast 5 sites of your choice per location.</h4>
            <form onSubmit={() => handleSubmit(event)}>
                <div>
                    <label>Locations : </label>
                    <input type="text" value="unlocked all locations" name="locations" />
                </div>
                <div>
                    <label>Accomodation type : </label>
                    <select name="accomodations" onChange={valueChange}>
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
                    <input type="number" name="pples" onChange={valueChange} required />
                </div>
                <input type="submit" value='submit' />
            </form>
        </div>
    )
};

export default Premier;
