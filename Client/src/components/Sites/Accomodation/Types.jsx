
import "./Types.css";
import img1 from "../../../resources/images/test.jpg";
import img2 from "../../../resources/images/14.jpg";
import img3 from "../../../resources/images/ts2.jpg";
import img4 from "../../../resources/images/bg.jpg";

const PropertyTypes = () => {
    const data = [img1, img2, img3, img4, img4, img1, img2, img3, img2, img3];
    const classes = ["tall", "wide", "square"];
    return (
        <div className="properties" id="accomodation">
            <h2>Accomodation property types</h2>
            <div className="row full-div grid-container">
                <div className="prop-cards grid-container">
                    {
                        data.map((item, index) => (
                            <div className={`property-card ${classes[index % classes.length]}`} >
                                <img src={item} />
                                <div className="prop-overlay grid-container">
                                    <h3>Hotel</h3>
                                </div>
                            </div>
                        ))
                    }

                    {/*<div className="property-card wide">
                        <img src={img2} />
                        <div className="prop-overlay grid-container">
                            <h3>Hotel</h3>
                        </div>
                    </div>
                    <div className="property-card tall">
                        <img src={img1} />
                    </div>
                    <div className="property-card square">
                        <img src={img3} />
                    </div>
                    <div className="property-card wide">
                        <img src={img4} />
                    </div>
                    <div className="property-card tall">
                        <img src={img2} />
                    </div>
                    <div className="property-card wide">
                        <img src={img3} />
                    </div>
                    <div className="property-card wide">
                        <img src={img2} />
                    </div>*/}
                </div>
            </div>
        </div >
    )
};

export default PropertyTypes;
