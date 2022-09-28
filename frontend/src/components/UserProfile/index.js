import "./index.css";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteUser from "./deleteUser";


const UserProfile = () => {
    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const showDeleteModal = () => {
        let ele = document.getElementById("delete-user-modal");
        ele.style.display = "block";
        let bg = document.getElementById("user-modal-background");
        bg.style.display = "block";
    }

    window.onclick = function(event) {
        let modal = document.getElementById("delete-user-modal");
        let modalBackground = document.getElementById("user-modal-background");
        if (event.target == modalBackground) {
            modal.style.display = "none";
            modalBackground.style.display = "none";
        }
    } 


    return (
      <>
        {/* <h1>this is a userprofile</h1> */}
        <div id="user-modal-background"></div>
        <div className="user-container">
          <div className="user-name">Hi {user.username}!</div>
          <div className="user-subtext">
            (Don't worry, your name won't appear anywhere else)
          </div>
          <div className="user-button-container">
            {/* <div className="user-stats">Stats </div> */}
            <div
              className="user-square-button"
              onClick={() => history.push("/user-confessions")}
            >
              see your confessions
            </div>
            <div
              className="user-square-button"
              onClick={() => history.push("/user-topics")}
            >
              see your topic threads
            </div>

            <div
              className="user-square-button"
              onClick={() => history.push("/settings")}
            >
              Edit User Preferences
            </div>
            <div className="user-square-button" onClick={logout}>
              Logout
            </div>
          </div>
          <div className="delete-user-button" onClick={showDeleteModal}>
            Delete User Profile
          </div>
          <div id="delete-user-modal">
            <DeleteUser />
          </div>
        </div>
      </>
    );
}

export default UserProfile;