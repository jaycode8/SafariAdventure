
import "./Community.css";

const Community = () => {
    return (
        <div className="community full-div grid-container" id="newsletter">
            <div className="grid-container">
                <h1>Join Our Community</h1>
                <p>We love to travel and create some amaizing memories with our clients</p>
                <form>
                    <input type="email" placeholder="janedoe@gmail.com" />
                    <input type="submit" value="Join Now" />
                </form>
            </div>
        </div>
    )
};

export default Community;
