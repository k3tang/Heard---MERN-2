import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import getCurrentUser, { updateUser } from "../../store/session.js"
import { useHistory, Link } from "react-router-dom";


const UserPreferences = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userMoods = useSelector(state => state.session.user.moods)
    const moodState = ["angry","loved", "anxious", "happy", "sad"]
    const [checkedKeywords, setCheckedKeywords] = useState(userMoods)
    const history = useHistory()
    const [successModal, setSuccessModal] = useState(false)



useEffect(() => {
    if (userMoods) {
        for (let moodName of userMoods) {
            let cb = document.getElementById(`${moodName}`);
            cb.classList.add("mood-checked");
            cb.classList.remove("mood-unchecked")
    } }
}, [userMoods])

    window.onclick = function (event) {
    let modal = document.getElementById("user-modal");
    let modalBackground = document.getElementById("user-edit-modal-background")
    if (event.target == modalBackground) {
      modal.style.display = "none";
      modalBackground.style.display = "none";
    }
  };

//toggle item based on user interaction 
    const toggleItem = (e) => {
        const ele = document.getElementById(`${e}`)
        if (ele.classList.contains("mood-checked")) {
            setCheckedKeywords(checkedKeywords.filter((x) => x !== ele.id));
            ele.classList.remove("mood-checked");
            ele.classList.add("mood-unchecked");
        } else {
            setCheckedKeywords([...checkedKeywords, ele.id]);
            ele.classList.add("mood-checked");
            ele.classList.remove("mood-unchecked")
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
           
                _id: user._id,
                username: user.username,
                email: user.email,
                audio: user.audio,
                moods: checkedKeywords
            
        }

        dispatch(updateUser(newUser)).then( res =>{
         
            if(res.type === 'session/RECEIVE_CURRENT_USER') {
                setSuccessModal(true)
            }
        // } 
    } )
}


  
    return (
      <>
        <h2 className="mood-header">Mood Preferences</h2>
        <div className="mood-button-container">
          {moodState.map((moodName) => (
            <p
              key={moodName}
              id={moodName}
              className="mood-item mood-unchecked"
              onClick={(e) => toggleItem(moodName)}
            >
              {moodName}
            </p>
          ))}
        </div>
        <button className="mood-submit" onClick={handleSubmit}>
          Submit
        </button>
        { successModal ? 
            <>
            <div id="user-edit-modal-background"></div>
            <div className="user-modal" id='user-modal'>
                <h1 className="delete-modal">preferences edited!</h1>
                <div className="edit-user-button-container">
                    <button className="confession-modal-button" id="create-another-confession" onClick={() => history.push("/account")}>Return to Profile</button>
                    <button className="confession-modal-button" onClick={() => history.push("/")}>Return Home</button>
                </div>
            </div>
            </>
               : "" }
        {user?.admin && (
          <Link to="/admin">
            <div>Admin</div>
          </Link>
        )}
      </>
    );
}

export default UserPreferences;