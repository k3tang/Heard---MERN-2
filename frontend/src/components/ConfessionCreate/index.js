 import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ConfessionCreate.css'
import { createConfession, getConfessions, fetchConfessions } from "../../store/confessions";
import { clearSessionErrors } from "../../store/session";
import { clearConfessionErrors } from "../../store/confessions";
import {useHistory} from "react-router-dom"

function ConfessionCreate () {
    const sessionUser = useSelector(state=>state.session.user);
    // const moodErrors = useSelector(state => state.errors.confessions.mood);
    // const bodyErrors = useSelector(state => state.errors.confessions.body);
    const errors = useSelector(state => state.errors);

    const dispatch = useDispatch();
    const history = useHistory()
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)


    useEffect(() => {
        return () => {
          dispatch(clearConfessionErrors());
        };
      }, [dispatch]);
    const [persist, setPersist] = useState(false)
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
            body,
            persist
        }
       
    
        dispatch(createConfession(confession)).then( res =>{
            if(res.type === 'confessions/RECEIVE_NEW_CONFESSION') {
                setSuccessModal(true)
               
            } else {

            }
        } )
     
    }
    

    return (
        <>
        {/* <h2 class='confession-create-title'> you may confess my child </    h2> */}
 

        <div className='confession-form-container'>

            <form className='confession-create-form' onSubmit={handleSubmit}>
                <div className='mood-input-container'>          



 
                    {/* <label> mood </label> */}
                        <select className='confession-mood-dropdown'name="mood" title="Select a Mood" id="mood" value={mood} onChange={update('mood')}>
                            <option defaultValue value='invalid'>I'm feeling...</option>
                            <option value="angry" >ANGRY</option>
                            <option value="loved" >LOVED</option>
                            <option value="anxious">ANXIOUS</option>
                            <option value="happy" >HAPPY</option>
                            <option value="sad" >SAD</option>
                        </select>
                
                        {/* <div className="errors">{errors?.mood.message}</div> */}
                </div>
                {/* <label> body </label> */}


                <div className="confession-textarea-container">
                    <textarea 
                        type='text' 
                        className="confession-text-area"
                        value={body} 
                        title="Tell us What's on Your Mind"
                        placeholder="what's on your mind?"
                        onChange={update('body')} />
                     
                </div>
                {sessionUser.admin && <div>
                    <input type='checkbox'  name='persist' value='persist' onChange={(e)=>setPersist(e.target.checked)}/>
                </div> }
                <input 
                    className="form-submit-button"
                    type='submit' 
                    title="First Select a Mood and Tell What's on Your Mind"
                    // style={{background: mood || body ? '#EDF0F4' }}
                    style={{cursor: mood || body ? 'pointer' : 'not-allowed'}}
                    disabled={!mood || !body}
                    value='confess'/>
            </form>
        </div>
        { successModal ? 
            <>
            <div className="confession-modal-background"></div>
            <div className="success-modal" id='success-modal'>
                <h1 className='success-modal-title'>your secret's safe with us</h1>
                <div className="success-button-container">
                    <button className="confession-modal-button" id="create-another-confession" onClick={() => history.push("/share")}>Keep Sharing</button>
                    <button className="confession-modal-button" onClick={() => history.push("/")}>Return Home</button>
                </div>
            </div>
            </>
               : "" }
        </>
    )
}

export default ConfessionCreate