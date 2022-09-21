import "./AnotherConfession.css";
import { Link } from "react-router-dom";

const AnotherConfession = () => {
    return (
        <>
            <div className="another-confession-container">
            <Link to={`confession-show`}>
                <h1 className="another-header">Read another?</h1>
                <div className="fa-sharp fa-solid fa-rotate-right" id="another-icon"></div>
                </Link>
            </div>
        </>
    )
}

export default AnotherConfession;