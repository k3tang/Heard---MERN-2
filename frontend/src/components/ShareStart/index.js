import { useHistory } from "react-router-dom"
import "./index.css"

const ShareStart = () => {
    const history = useHistory();

    return (
        <>
            <div className="share-container">
                <h1 className="share-header">How do you want to share?</h1>
                <div className="share-button-container">
                    <div className="share-square-button" onClick={() => history.push("/topic-create")}>Create Chat Request</div>
                    <div className="share-square-button" onClick={() => history.push("/confession-create")}>Create Confession</div>
                </div>
            </div>
        </>
    )
}

export default ShareStart;