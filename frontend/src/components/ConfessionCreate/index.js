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
    const userId = sessionUser._id

    const update = (field) => {
        const setState = field === 'mood' ? setMood : setBody;
        return e => setState(e.currentTarget.value);
    }

    

    const handleSubmit = e => {
        e.preventDefault();
        const confession = {
            userId,
            mood,
            body
        }
        dispatch(createConfession(confession))
    }
    

    return (
        <>
        {/* <h2 class='confession-create-title'> you may confess my child </    h2> */}

        <div class='confession-form-container'>
            <form class='confession-create-form' onSubmit={handleSubmit}>
                <div class='mood-input-container'>
                    {/* <label> mood </label> */}
                        <select className='confession-mood-dropdown'name="mood" id="mood" value={mood} onChange={update('mood')}>
                            <option defaultValue value='invalid'> I'm feeling...</option>
                            <option value="angry" >Angry</option>
                            <option value="loved" >Loved</option>
                            <option value="anxious">Anxious</option>
                            <option value="happy" >Happy</option>
                            <option value="sad" >Sad</option>
                        </select>
                       
                </div>
                {/* <label> body </label> */}
                <div className="confession-textarea-container">
                    <textarea 
                        type='text' 
                        className="confession-text-area"
                        value={body} 
                        placeholder="what's on your mind?"
                        onChange={update('body')} />
                </div>
                <input 
                    className="form-submit-button"
                    type='submit' 
                     disabled={!mood || !body}
                    value='confess'/>
            </form>
        </div>
        </>
    )
}

export default ConfessionCreate