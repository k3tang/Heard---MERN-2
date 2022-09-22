import { useHistory } from "react-router-dom";
import "./index.css";

const ListenStart = () => {
    const history = useHistory();

    return (
        <>
            <div className="listen-container">
                <h1 className="listen-header">Lend your ear to ... </h1>
                <div className="listen-button-container">
                <div className="listen-square-button">Chat as Listener</div>
                <div className="listen-square-button" onClick={() => history.push("/confession-show")}>Hear Confession</div>
                </div>
            </div>
        </>
    )
}

export default ListenStart;