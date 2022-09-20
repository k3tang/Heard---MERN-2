import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ConfessionCreate.css'
import { createConfession } from "../../store/confessions";
import { clearSessionErrors } from "../../store/session";

function ConfessionCreate () {
    const sessionUser = useSelector(state=>state.session.user);
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
      }, [dispatch]);

    const [mood, setMood] = useState('');
    const [body, setBody] = useState('');

    const update = (field) => {
        const setState = field === 'moood' ? setMood : setBody;
        return e => setState(e.currentTarget.value);
    }
    

    return (
        <>
        <h2>create a confession </h2>
        <div class='confession-form-container'>
            <form>
                <label> mood </label>
                    <input type='radio' value={mood} onChange={update('mood')} />
                <label> Body </label>
                    <input
                        type='radio'
                        value={mood}
                        onChange={update('body')}
                    /> 
            </form>
        </div>
        </>
    )
}

export default ConfessionCreate