import { useHistory } from "react-router-dom";
import "./index.css";

const ListenStart = () => {
    const history = useHistory();

    return (
        <>
            <div className="listen-container">
                <div className="listen-chat">Chat as Listener</div>
                <div className="listen-confession" onClick={() => history.push("/confession-show")}>Hear Confession</div>
            </div>
        </>
    )
}

export default ListenStart;