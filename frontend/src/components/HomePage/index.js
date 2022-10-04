import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import { Link } from 'react-router-dom'

import { useEffect } from "react";

const HomePage = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory();



    // useEffect(() => {
        
    // }, [])

    return (
        <>
            {/* <div id="background-modal">Instructions here</div> */}
            <div className="home-button-container">
                <h1 className="home-header">What would you like to do?</h1>
                <div className="home-square-button" onClick={() => history.push("/listen")}>Be a Listener</div>
                <div className="home-square-button" onClick={() => history.push("/share")}>Share your thoughts</div>
            </div>
            {/* <div className="about-link" onClick={() => history.push("/about")}>
                About the Creators
            </div>
            <Link className="about-link" to={`/about`}>
                About the Creators
            </Link> */}
        </>
    )
}

export default HomePage;