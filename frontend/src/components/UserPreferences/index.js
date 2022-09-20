import { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";

const UserPreferences = () => {
    const user = useSelector(state => state.session.user)
    const [checkedKeywords, setCheckedKeywords] = useState(user.moods)

    const toggleItem = (e) => {
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


    // add mode toggle for light/dark mode 
    return (
        <>
            <div className="light-dark-modes">
                <div className="mode-toggle">
                    <input className="toggle-switch"
                        type="checkbox"
                        name="toggleSwitch" />
                    <label className="toggle-label" htmlFor="mode-toggle"></label>
                    <span className="toggle-switch-inner"></span>
                    <span className="toggle-switch-switch"></span>
                </div>
            </div>
            <div className="mood-list">
                <div className="mood-button mood-checked" value="angry" >
                    <div id="mood-color-red"></div>
                    <div className="mood-text">Angry</div>
                    <div className="mood-button mood-checked" value="loved" >
                        <div id="mood-color-pink"></div>
                        <div className="mood-text">Loved</div>
                    </div>
                    <div className="mood-button mood-checked" value="anxious" >
                        <div id="mood-color-green"></div>
                        <div className="mood-text">Anxious</div>
                    </div>
                    <div className="mood-button mood-checked" value="happy" >
                        <div id="mood-color-"></div>
                        <div className="mood-text-yellow">Happy</div>
                    </div>
                    <div className="mood-button mood-checked" value="sad" >
                        <div id="mood-color-red"></div>
                        <div className="mood-text-blue">Sad</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPreferences;