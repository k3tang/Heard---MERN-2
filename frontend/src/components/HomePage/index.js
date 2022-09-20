import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { useEffect } from "react";

const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory();

    // if (!user) {
    //     history.push("/")
    // }

    window.onclick = function (event) {
        let modalBackground = document.getElementById("background-modal")
        if (event.target === modalBackground) {
            modalBackground.style.display = "none"
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            <h1>this is a homepage</h1>
            <div id="background-modal">Instructions here</div>
            <div>{user.name}</div>
            <div className="listen-home-button" onClick={() => history.push("/listen")}>Listen</div>
            <div className="share-home-button" onClick={() => history.push("/share")}>Share</div>
        </>
    )
}

export default HomePage;