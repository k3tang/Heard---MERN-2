import { useHistory } from "react-router-dom";
import "./index.css";

const LandingPage = () => {
    const history = useHistory();

    return (
        <>
        <div className='page-container'>
            <h1 className='landing-title'>Heard</h1>
            <div className="button-container">
                <button className="square-button" onClick={() => history.push("/login")}>Login</button>
                <button className="square-button" onClick={() => history.push("/signup")}>Sign Up</button>
            </div>
        </div>
        </>
    )
};

export default LandingPage;
