import { useHistory } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
    const history = useHistory();

    return (
        <>
            <div className="landing-background">
            </div>
            <div className="landing-button-container">
                <div className="login-button" onClick={() => history.push("/login")}>Login</div>
                <div className="signup-button" onClick={() => history.push("/signup")}>Sign Up</div>
            </div>
        </>
    )
};

export default LandingPage;