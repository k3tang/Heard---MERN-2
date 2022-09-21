import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import getCurrentUser, { updateUser } from "../../store/session.js"


const UserPreferences = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userMoods = useSelector(state => state.session.user.moods)
    const moodState = ["angry","loved", "anxious", "happy", "sad"]
    const [checkedKeywords, setCheckedKeywords] = useState(userMoods)

    console.log(userMoods, "moods");



// setting initial/saved mood preferences 
useEffect(() => {
    for (let moodName of checkedKeywords) {
        let cb = document.getElementById(`${moodName}`);
        cb.classList.add("mood-checked");
        cb.classList.remove("mood-unchecked")
    }
}, [])


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
    
    console.log(checkedKeywords, "selected keywords")

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
           
                _id: user._id,
                username: user.username,
                email: user.email,
                audio: user.audio,
                moods: checkedKeywords
            
        }

        return dispatch(updateUser(newUser))
    }
    
    // add mode toggle for light/dark mode 
    return (
        <>
            <div className="light-dark-mode">
                <div id="light-mode-icon" className="fas fa-sun"></div>
                <div className="toggle-container">
                    <label className="switch">
                        <input type="checkbox" />
                            <span className="slider round"></span>
                    </label>
                </div>
                <div id="dark-mode-icon" className=" fas fa-moon"></div>
            </div>
            <h2 className="mood-header">Mood Preferences</h2>
              {moodState.map((moodName) => <p key={moodName} id={moodName} className="mood-item mood-unchecked" onClick={(e) => toggleItem(moodName)}>{moodName}</p>)}
            <button className="mood-submit" onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default UserPreferences;