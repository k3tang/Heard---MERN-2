import { useHistory } from "react-router-dom"
import "./index.css"

const ShareStart = () => {
    const history = useHistory();

    return (
        <>
            <div className="share-container">
                <div className="share-chat" onClick={() => history.push("/topic-create")}>Create Chat Request</div>
                <div className="share-confession" onClick={() => history.push("/confession-create")}>Create Confession</div>
            </div>
        </>
    )
}

export default ShareStart;