import { useDispatch, useSelector } from "react-redux";
import {deleteUser} from "../../store/session";
import "./index.css";


const DeleteUser = () => {
    const userId = useSelector(state => state.session.user._id)
    const dispatch = useDispatch();

    const closeModal = () => {
        let ele = document.getElementById("delete-user-modal");
        ele.style.display = "none";
        let bg = document.getElementById("user-modal-background");
        bg.style.display = "none";
    }

    return (
        <>
            <div id="close-delete-modal" className="fa-solid fa-x" onClick={closeModal}></div>
            <h1 className="delete-modal">Thank you for playing. The user can be deleted, but not on the demo page ;).</h1>
            <div className="delete-button-container">
                <div id="delete-user" className="delete-square-button">Delete User</div>
                <div className="delete-square-button" onClick={closeModal}>Cancel</div>
            </div>
        </>
    )
}

export default DeleteUser;