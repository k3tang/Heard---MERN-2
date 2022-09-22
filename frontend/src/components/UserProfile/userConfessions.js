import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConfessions } from "../../store/confessions";
import "./index.css";

const UserConfessions = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user._id)
    const uConfessions = useSelector(state => state.confessions.user)

    console.log("confessions", uConfessions)

    useEffect(() => {
        dispatch(fetchUserConfessions(userId))
    }, [])

    const mapConfessions = () => {
        uConfessions.map(conf => {
            <div className="confession-listing">{conf.user}</div>
        })
    }

    return (
        <>
            <div className="user-confession-container">
                Map confessions here
            </div>
        </>
    )
}

export default UserConfessions;