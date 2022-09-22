import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ConfessionCreate.css'
import { createConfession, getConfessions, fetchConfessions } from "../../store/confessions";
import { clearSessionErrors } from "../../store/session";
import { clearConfessionErrors } from "../../store/confessions";
import {useHistory} from "react-router-dom"

function ConfessionCreate () {
    const sessionUser = useSelector(state=>state.session.user);
    const errors = useSelector(state => state.errors.confessions);
    const dispatch = useDispatch();
    const history = useHistory()
    const confessions = useSelector(getConfessions)
    let newConfession = confessions[1]


    useEffect(() =>{
        dispatch(fetchConfessions())
    }, [])

    useEffect(() => {
        return () => {
          dispatch(clearConfessionErrors());
        };
      }, [dispatch]);

    const [mood, setMood] = useState('');
    const [body, setBody] = useState('');
    const userId = sessionUser._id
    console.log(userId)


    console.log(newConfession)

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
        console.log('listing in submit', confession)
    
        dispatch(createConfession(confession)).then( res =>{
            if(res.type === 'confessions/RECEIVE_NEW_CONFESSION') {
                history.push('/')
                alert('your secrets safe with us')
            }
        } )
            // .then(onFulfilled)
        // if(totalConfessions !== confessions.length) {
        //    
        // }

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
                            <option value="pink" >Angry</option>
                            <option value="loved" >Loved</option>
                            <option value="anxious">Anxious</option>
                            <option value="happy" >Happy</option>
                            <option value="sad" >Sad</option>
                        </select>
                        <div className="errors">{errors?.mood.message}</div>
                </div>
                {/* <label> body </label> */}


                <div className="confession-textarea-container">
                    <textarea 
                        type='text' 
                        className="confession-text-area"
                        value={body} 
                        placeholder="what's on your mind?"
                        onChange={update('body')} />
                        <div className="errors">{errors?.body.message}</div>
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