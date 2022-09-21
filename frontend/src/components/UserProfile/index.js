import "./index.css";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const UserProfile = () => {
    const user = useSelector(state => state.session.user);
    console.log("user", user)
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };



    return (
        <>
            {/* <h1>this is a userprofile</h1> */}
            <div className="user-container">
                <div className="user-info">
                    <div className="user-name">Hi {user.username}!</div>
                    {/* <div className="user-stats">Stats </div> */}
                    <div className="edit-name" onClick={() => history.push("/settings")}>Edit User Preferences</div>
                    <div className="logout-button" onClick={logout}>Logout</div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;