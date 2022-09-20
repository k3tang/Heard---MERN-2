eximport "./index.css";
// import * sessionActions from "../../store/session";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const user = useSelector(state => state.session.user)

    const logout = (e) => {
        // dispatchEvent(sessionActions.logout());
    }



    return (
        <>
            <h1>this is a userprofile</h1>
            <div className="user-container">
                <div className="user-info">
                    {/* <div className="user-name">{user.name}</div> */}
                    <div className="user-stats">Stats </div>
                    <div className="logout-button" onClick={logout}>Logout</div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;