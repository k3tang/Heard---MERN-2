import { useHistory } from "react-router-dom";
import bottleLogo from "../../assets/bottle pic.png"
import "./index.css";

const LandingPage = () => {
    const history = useHistory();

    return (
        <>
        <div className='page-container'>
            <img className="bottle-logo" src={bottleLogo} alt="bottle-logo"/>
            <h1 className='landing-title'>Heard</h1>
            <div className="button-container">
                <button className="square-button" onClick={() => history.push("/login")}>Login</button>
                <button className="square-button" onClick={() => history.push("/welcome")}>First time here?</button>
            </div>
            <div className="landing-about-link" onClick={() => history.push("/about")}>
                About the Creators
            </div>
        </div>

        </>
    )
};

export default LandingPage;

