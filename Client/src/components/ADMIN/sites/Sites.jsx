
import { useState } from "react";
import "./Sites.css";
import { FiPlus } from "react-icons/fi";
import { GiCrossMark, GiPencil } from "react-icons/gi";
import Form from "./Form";

const Sites = () => {
    const [isToggle, setToggle] = useState(false);

    const toggleFloat = () => {
        setToggle(!isToggle);
        console.log("helo")
    };

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
            <div className="dst-list full-div">m</div>
        </div>
    )
};

export default Sites;
