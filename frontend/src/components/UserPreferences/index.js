import { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";

const UserPreferences = () => {
    const user = useSelector(state => state.session.user)
    const [checkedKeywords, setCheckedKeywords] = useState(user.moods)

    const toggleItem = (target) => {
        console.log(target.classList, "target")
        if (target.classList.contains("mood-checked")) {
            setCheckedKeywords(checkedKeywords.filter((x) => x !== target.value));
            target.classList.remove("mood-checked");
            target.classList.add("mood-unchecked");
        } else {
            setCheckedKeywords([...checkedKeywords, target.value]);
            target.classList.add("mood-checked");
            target.classList.remove("mood-unchecked")
        }
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
            <div className="mood-list">
                <div className="mood-button mood-checked">
                    <div id="mood-color-red"></div>
                    <button className="mood-text" value="angry" onClick={(e) => toggleItem(e.target.value)}>Angry</button>
                    <div className="mood-button mood-checked" value="loved" onClick={(e) => toggleItem(e.target)}>
                        <div id="mood-color-pink"></div>
                        <div className="mood-text">Loved</div>
                    </div>
                    <div className="mood-button mood-checked" value="" onClick={(e) => toggleItem()}>
                        <div id="mood-color-green"></div>
                        <div className="mood-text">Anxious</div>
                    </div>
                    <div className="mood-button mood-checked" value="happy" onClick={(e) => toggleItem()}>
                        <div id="mood-color-"></div>
                        <div className="mood-text-yellow">Happy</div>
                    </div>
                    <div className="mood-button mood-checked" value="sad" onClick={(e) => toggleItem()}>
                        <div id="mood-color-red"></div>
                        <div className="mood-text-blue">Sad</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPreferences;