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
    const [errorModal, setErrorModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false)


    useEffect(() => {
        return () => {
          dispatch(clearConfessionErrors());
        };
      }, [dispatch]);

    const [mood, setMood] = useState('');
    const [body, setBody] = useState('');
    const userId = sessionUser._id

    if(errors) {
        setErrorModal(true)
    }



    const update = (field) => {
        const setState = field === 'mood' ? setMood : setBody;
        return e => setState(e.currentTarget.value);
    }
    

    const handleSubmit = e => {
        e.preventDefault();
        const confession = {
            mood,
            body
        }
        console.log('listing in submit', confession)
    
        dispatch(createConfession(confession)).then( res =>{
            if(res.type === 'confessions/RECEIVE_NEW_CONFESSION') {
                setSuccessModal(true)
                // history.push('/')  
            } else {

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
                        <select className='confession-mood-dropdown'name="mood" title="Select a Mood" id="mood" value={mood} onChange={update('mood')}>
                            <option defaultValue value='invalid'> I'm feeling...</option>
                            <option value="angry" >Angry</option>
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
                        title="Tell us What's on Your Mind"
                        placeholder="what's on your mind?"
                        onChange={update('body')} />
                        {/* <div className="errors">{errors?.body.message}</div> */}
                </div>
                <input 
                    className="form-submit-button"
                    type='submit' 
                    title="Select a Mood and Tell What's on Your Mind"
                    style={{cursor: mood || body ? 'pointer' : 'not-allowed'}}
                    disabled={!mood || !body}
                    value='confess'/>
            </form>
        </div>
        { successModal ? 
            <>
            <div className="confession-modal-background"></div>
            <div className="success-modal" id='success-modal'>
                <h1 >your secret's safe with us</h1>
                <div className="success-button-container">
                    <button id="create-another-confession" onClick={() => history.push("/share")}>Keep Sharing</button>
                    <button className="return-home-button" onClick={() => history.push("/")}>Return Home</button>
                </div>
            </div>
            </>
               : "" }
        { errorModal ? 
            <>
             <div className="confession-modal-background"></div>
            <div className="success-modal">
                <h1 className='success-modal-title'>your secret's safe with us</h1>
                <div className="create-another-confession" onClick={() => history.push("/share")}>Keep Sharing</div>
                <div className="return-home-button" onClick={() => history.push("/")}>Return Home</div>

                <div className="success-button-container">
                </div>
            </div>
            </>
               : "" }
        </>
    )
}

export default ConfessionCreate