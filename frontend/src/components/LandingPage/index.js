import { useHistory } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
    const history = useHistory();

    return (
        <>
        <div className='page-container'>
            <h1 className='landing-title'>Heard</h1>
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
