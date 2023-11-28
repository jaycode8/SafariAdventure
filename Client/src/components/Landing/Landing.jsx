
import { useEffect, useState } from "react";
import "./Landing.css";
import axios from "axios";

const sessionToken = localStorage.getItem("DRFAuthToken");
const url_api = import.meta.env.VITE_REACT_APP_API_URL;

const LandingPage = () => {
    const [user, setUser] = useState();
    const fetchLogedUser = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${url_api}/users/user`,
                headers: {
                    Authorization: `Token ${sessionToken}`,
                },
            });
            setUser(res.data.user);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchLogedUser()
    }, []);

    user ? (
        user.is_superuser ?
            (window.location.href = "/dashboard")
            : ("")
    ) : ("")

    return (
        <div className="landing-page" id="home">
            <section>
                <div className="text">
                    <span>
                        <h3>Welcome to incredible Safari experience</h3>
                    </span>
                    <span className="paragraph">
                        <p>
                            We love to share with you about making new journey never forget ever.
                            Wonderfull experience thats starts in here !
                        </p>
                    </span>

                </div>
            </section>
        </div>
    )
};

export default LandingPage;
