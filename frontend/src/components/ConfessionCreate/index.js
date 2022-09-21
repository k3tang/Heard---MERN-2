import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ConfessionCreate.css'
import { createConfession } from "../../store/confessions";
import { clearSessionErrors } from "../../store/session";

function ConfessionCreate () {
    const sessionUser = useSelector(state=>state.session.user);
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();
    const [checkedKeywords, setCheckedKeywords] = useState(sessionUser.moods)

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

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
      }, [dispatch]);

    const [mood, setMood] = useState('');
    const [body, setBody] = useState('');
    const userId = sessionUser.id

    const update = (field) => {
        const setState = field === 'moood' ? setMood : setBody;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const confession = {
            userId,
            checkedKeywords,
            body
        }
        console.log('listing in submit', confession)
        dispatch(createConfession(confession))
    }
    

    return (
        <>
        <h2>create a confession </h2>
        <div class='confession-form-container'>
            <form class='confession-create-form'>
                <div class='mood-input-container'>
                    <label> mood </label>
                        <div class='mood-button-container'>
                            <button button class="mood-button" value="angry" onClick={(e) => toggleItem(e.target.value)}/>
                            <h2 class='mood-text'>Angry</h2>
                        </div>
                        <div class='mood-button-container'>
                            <button button class="mood-button" value="loved" onClick={(e) => toggleItem(e.target.value)}/>
                            <h2 class='mood-text'>Loved</h2>
                        </div>
                        <div class='mood-button-container'>
                            <button button class="mood-button" value="anxious" onClick={(e) => toggleItem(e.target.value)}/>
                            <h2 class='mood-text'>Anxious</h2>
                        </div>
                        <div class='mood-button-container'>
                            <button button class="mood-button" value="happy" onClick={(e) => toggleItem(e.target.value)}/>
                            <h2 class='mood-text'>Happy</h2>
                        </div>
                        <div class='mood-button-container'>
                            <button button class="mood-button" value="sad" onClick={(e) => toggleItem(e.target.value)}/>
                            <h2 class='mood-text'>Angry</h2>
                        </div>
                </div>
                <label> body </label>
                    <textarea 
                        type='text' 
                        value={body} 
                        onChange={update('mood')} />
                    
            </form>
        </div>
        </>
    )
}

export default ConfessionCreate