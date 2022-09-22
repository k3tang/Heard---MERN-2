import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConfessions } from "../../store/confessions";
import ConfessionListing from "./confessionListing";
import "./index.css";

const UserConfessions = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user._id)
    const uConfessions = useSelector(state => state.confessions.user.body)

    
    console.log("user id", user)
    console.log("confessions", uConfessions)
    

    useEffect(() => {
        dispatch(fetchUserConfessions(user._id))
    }, [uConfessions])

    const mapConfessions = () => {
        // if (uConfessions.length === 0) {
        //     return "You have no confessions yet."
        // } else {
            return uConfessions.map(conf => (
                <ConfessionListing key={conf._id} conf={conf}/>
            ))
         }

    return (
        <>
            <div className="user-confession-container">
                {/* { user ? mapConfessions() : ""} */}
                hello world
            </div>
        </>
    )
}

export default UserConfessions;