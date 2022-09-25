import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import getCurrentUser, { updateUser } from "../../store/session.js"
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const UserPreferences = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const userMoods = useSelector(state => state.session.user.moods)
    const moodState = ["angry","loved", "anxious", "happy", "sad"]
    const [checkedKeywords, setCheckedKeywords] = useState(userMoods)
    const history = useHistory()




// setting initial/saved mood preferences 
useEffect(() => {
    if (userMoods) {
        for (let moodName of userMoods) {
            let cb = document.getElementById(`${moodName}`);
            cb.classList.add("mood-checked");
            cb.classList.remove("mood-unchecked")
    } }
}, [userMoods])


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
            console.log(res.type)
            if(res.type === 'session/RECEIVE_CURRENT_USER') {
                history.push('/account')
                alert('updates saved')
            }
        // } 
    } )
}


    // const toggleMode = () => {
    //     const body = document.getElementById("root")
    //     const container = document.getElementById("entire-container")
    //     if (body.classList.contains("dark")) {
    //         body.classList.remove("dark");
    //         const container = document.getElementById("entire-container-dark")
    //         container.id = 'entire-container';
    //     } else {
    //         body.classList.add("dark");
    //         container.id = 'entire-container-dark';
    //     }
    // }
    
    // add mode toggle for light/dark mode 
    return (
        <>
            {/* <div className="light-dark-mode">
                <div id="light-mode-icon" className="fas fa-sun"></div>
                <div className="toggle-container">
                    <label className="switch">
                        <input type="checkbox" onClick={toggleMode} />
                            <span className="slider round"></span>
                    </label>
                </div>
                <div id="dark-mode-icon" className=" fas fa-moon"></div>
            </div> */}
            <h2 className="mood-header">Mood Preferences</h2>
            <div className="mood-button-container">
              {moodState.map((moodName) => <p key={moodName} id={moodName} className="mood-item mood-unchecked" onClick={(e) => toggleItem(moodName)}>{moodName}</p>)}
            </div>
            <button className="mood-submit" onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default UserPreferences;