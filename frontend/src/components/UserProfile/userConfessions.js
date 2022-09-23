import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConfessions } from "../../store/confessions";
import ConfessionListing from "./confessionListing";
import "./index.css";

const UserConfessions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user._id);
    const uConfessions = useSelector(state => state.confessions.user);
    const [isLoading, setIsLoading] = useState(true);

    
    console.log("user id", user)
    console.log("confessions", uConfessions)
    

    useEffect(() => {
        dispatch(fetchUserConfessions(user))
        setTimeout(function () {
            setIsLoading(false);
        }, 3000)
    }, [uConfessions.length])


    const mapConfessions = () => {
            return uConfessions.map(conf => (
                <ConfessionListing key={conf._id} conf={conf}/>
            ))
        }

    return (
        <>
            <div className="user-confession-container">
                <h1>All your confessions</h1>
                {isLoading ?
                    <div className="loading-container">
                        <h1 className="loading-title"> gathering your secrets... </h1>
                        <img src="https://derailed-seed.s3.us-west-1.amazonaws.com/loading-gif.gif"></img>
                    </div>
                    :
                    <div>{mapConfessions()}</div>
                }
               
            </div>
        </>
    )
}

export default UserConfessions;