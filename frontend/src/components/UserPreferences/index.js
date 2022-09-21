import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import getCurrentUser from "../../store/session.js"

const UserPreferences = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [checkedKeywords, setCheckedKeywords] = useState(user.moods)
    const moodState = ["angry","loved", "anxious", "happy", "sad"]
    const [moods, setMoods] = useState(moodState);

    // for (let i = 0; i < moods.length; i++) {
    //     console.log(moods[i], "moods")
    //     let ele = document.getElementById(`${moods[i]}`);
    //     console.log("ele", ele)
    //     ele.classList.add("mood-unchecked");
    //     ele.style.backgroundColor = "blue";
    // }

    const toggleItem = (e) => {
        e.preventDefault();
        console.log(e.currentTarget.value, "target")
        if (e.target.classList.contains("mood-checked")) {
            setCheckedKeywords(checkedKeywords.filter((x) => x !== e.target.value));
            e.target.classList.remove("mood-checked");
            e.target.classList.add("mood-unchecked");
        } else {
            setCheckedKeywords([...checkedKeywords, e.target.value]);
            e.target.classList.add("mood-checked");
            e.target.classList.remove("mood-unchecked")
        }
    }

    // useEffect(() => {
    //     dispatch(getCurrentUser())
    // }, [])

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
            <form className="mood-list" onSubmit={(e) => toggleItem()}>
                <button id="angry" className="mood-button mood-checked" value="angry" onClick={(e) => toggleItem()}>
                    <div id="mood-color-red"></div>
                    <div className="mood-text">Angry</div>
                </button>
                <div id="loved" className="mood-button mood-checked" value="loved" onClick={(e) => toggleItem(e.target)}>
                    <div id="mood-color-pink"></div>
                    <div className="mood-text">Loved</div>
                </div>
                <div id="mood-anxious" className="mood-button mood-checked" value="anxious" onClick={(e) => toggleItem()}>
                    <div id="mood-color-green"></div>
                    <div className="mood-text">Anxious</div>
                </div>
                <div id="mood-happy" className="mood-button mood-checked" value="happy" onClick={(e) => toggleItem()}>
                    <div id="mood-color-"></div>
                    <div className="mood-text-yellow">Happy</div>
                </div>
                <div id="mood-sad" className="mood-button mood-checked" value="sad" onClick={(e) => toggleItem()}>
                    <div id="mood-color-red"></div>
                    <div className="mood-text-blue">Sad</div>
                </div>
            </form>
        </>
    )
}

export default UserPreferences;