import { useHistory } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
    const history = useHistory();

    return (
        <>
        <div class='page-container'>
            <h1 class='landing-title'>Heard</h1>
            <div className="landing-background">
            </div>
            <div className="landing-button-container">
                <button className="landing-button" onClick={() => history.push("/login")}>Login</button>
                <button className="landing-button" onClick={() => history.push("/signup")}>Sign Up</button>
            </div>
        </div>
        </>
    )
};

export default LandingPage;
