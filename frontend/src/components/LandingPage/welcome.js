import "./index.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const Welcome = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email: "demo@test.com", password: "password" }));
    }

    return (
        <>
            <div className="welcome-container">
                <div className="welcome-header">Welcome to Heard!</div>
                <div className="welcome-message">We are an active listening community of anonymous secret bearers and sharers. We strive to show genuine kindness to strangers with empathy and understanding. We are excited for you to join us! </div>
                <div className="button-container">
                    <button className="square-button" onClick={() => history.push("/signup")}>Sign up</button>
                    <button className="square-button" onClick={demoLogin}>Login as demo user</button>
                </div>
            </div>
        </>
    )
};

export default Welcome;