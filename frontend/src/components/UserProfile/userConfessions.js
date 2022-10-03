import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConfessions } from "../../store/confessions";
import ConfessionListing from "./confessionListing";
import bottleLogo from "../../assets/bottle pic.png";
import "./index.css";

const UserConfessions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user._id);
    const uConfessions = useSelector(state => {
        return Object.values(state.confessions.user)
    })
    const [isLoading, setIsLoading] = useState(true);

    console.log(uConfessions, "confessions")
    

    useEffect(() => {
        dispatch(fetchUserConfessions(user))
        const timer = setTimeout(function () {
            setIsLoading(false);
        }, 3000)
         return () => clearTimeout(timer)
    }, [uConfessions.length])


    const mapConfessions = () => {
            return uConfessions.map(conf => (
                <ConfessionListing key={conf._id} conf={conf}/>
            ))
        }

    return (
        <>
            <div className="user-confession-container">
                {isLoading ?
                    <div className="loading-container">
                        <img className="logo-timer" src={bottleLogo}></img>
                        <h1 className="loading-title"> Quietly gathering your secrets... </h1>
                    </div>
                    :
                    <>
                        <h1 className="user-conf-header">All your confessions</h1>
                        <div className="mapped-conf">{mapConfessions()}</div>
                    </>
                }
               
            </div>
        </>
    )
}

export default UserConfessions;