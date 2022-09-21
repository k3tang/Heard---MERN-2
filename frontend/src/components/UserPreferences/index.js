import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import getCurrentUser from "../../store/session.js"

const UserPreferences = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const moodState = ["angry","loved", "anxious", "happy", "sad"]
    const [checkedKeywords, setCheckedKeywords] = useState(moodState)
    // const [moods, setMoods] = useState(moodState);

    // for (let i = 0; i < moods.length; i++) {
    //     console.log(moods[i], "moods")
    //     let ele = document.getElementById(`${moods[i]}`);
    //     console.log("ele", ele)
    //     ele.classList.add("mood-unchecked");
    //     ele.style.backgroundColor = "blue";
    // }
// 
// setting initial/saved mood preferences 
useEffect(() => {
    for (let moodName of moodState) {
        let cb = document.getElementById(`${moodName}`);
        cb.classList.add("mood-checked");
        cb.classList.remove("mood-unchecked")
    }
}, [])


//toggle item based on user interaction 
    const toggleItem = (e) => {
        // e.preventDefault();
        console.log(e, "target")
        const ele = document.getElementById(`${e}`)
        console.log(ele, "ele")
        console.log(checkedKeywords, "keywords")
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


            {/* <form className="mood-list" onSubmit={(e) => toggleItem}> */}
                {/* <button id="angry" className="mood-button mood-checked" value="angry" onClick={(e) => toggleItem()}/> */}
                    {/* <div id="mood-color-red"></div>
                <p className="mood-text mood-checked" onClick={toggleItem}>Angry</p> */}
                    {/* <div className="mood-button mood-checked" value="loved" onClick={(e) => toggleItem(ele)}>
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
                </div> */}
            {/* </form> */}
        </>
    )
}

export default UserPreferences;