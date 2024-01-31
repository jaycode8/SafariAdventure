
import "./Users.css";
import axios from "axios";
import { useEffect, useState } from "react";

const url_api = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("DRFAuthToken");

const link = 'http://127.0.0.1:8000/users/lsusers/'
const LsUsers = () => {
    const [lsusers, setLsUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/users/lsusers/`,
                // url: link
            });
            setLsUsers(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    console.log('http://127.0.0.1:8000/users/lsusers/')
    console.log(`${url_api}/users/lsusers/`)

    return (
        <div className="lsusers grid-container">
            <h3>Available Users</h3>
            <table>
                <tr>
                    <th>NO.</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>country</th>
                    <th>gender</th>
                    <th>profile</th>
                </tr>
                {
                    lsusers.map((user, index) => (
                        <tr key={index}>
                            <td>#{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.country}</td>
                            <td>{
                                user.gender == 1 ? ("Male") : (
                                    user.gender == 2 ? "Female" : "Other"
                                )
                            }</td>
                            <td>
                                <img src={`${url_api}${user.profile}`} />
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
};

export default LsUsers;
