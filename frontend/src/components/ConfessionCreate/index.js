 import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import './ConfessionCreate.css'
import { createConfession, getConfessions, fetchConfessions } from "../../store/confessions";
import { clearSessionErrors } from "../../store/session";
import { clearConfessionErrors } from "../../store/confessions";
import {useHistory} from "react-router-dom"
import { AlertTitle } from "@chakra-ui/react";

function ConfessionCreate () {
    const sessionUser = useSelector(state=>state.session.user);
    const errors = useSelector(state => state.errors);

    const dispatch = useDispatch();
    const history = useHistory()
    const titleError = useRef(null)
    const [successModal, setSuccessModal] = useState(false)


    useEffect(() => {
        return () => {
          dispatch(clearConfessionErrors());
        };
      }, [dispatch]);
    const [persist, setPersist] = useState(false)
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [mood, setMood] = useState('invalid');
    
    const [body, setBody] = useState('');
    const [bodyError, setBodyError] = useState("Make sure your confession is at least 3 characters long!");
    const userId = sessionUser._id;


    // const update = (field) => {
    //     const setState = field === 'mood' ? setMood : setBody;
    //     return e => setState(e.currentTarget.value);
    // }

    const changeBody = (e) => {
        titleError.current.style.display = "block";
        // document.querySelector("#title-error").style.display = "block";
        document.querySelector("#mood-error").style.color = "red";
        setBody(e.target.value);
        if(e.target.value.length < 3) {
            setBodyError("Make sure your confession is at least 3 characters long!");
            setIsFormComplete(false);
        } else if(e.target.value.length > 300) {
            setBodyError("Make sure your confession is 300 characters or less!");
            setIsFormComplete(false);
        } else {
            setBodyError("");
            setIsFormComplete(mood !== "invalid");
        }
    }

    const changeMood = (e) => {
        document.querySelector("#mood-error").style.color = "red";
        setMood(e.target.value);
        setIsFormComplete(e.target.value !== "invalid" && bodyError === "");
    }

    useEffect(() => {
        document.querySelector(".form-submit-button").disabled = !isFormComplete;
        document.querySelector(".form-submit-button").style.cursor = isFormComplete ? "pointer" : "not-allowed";
    }, [isFormComplete])
    

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
 
        <div className='confession-form-container'>

            <form className='confession-create-form' onSubmit={handleSubmit}>
                <div className='mood-input-container'>          

                        <select className='confession-mood-dropdown'name="mood" title="Select a Mood" id="mood" value={mood} onChange={changeMood}>
                            <option defaultValue value='invalid'>I'm feeling...</option>
                            <option value="angry" >ANGRY</option>
                            <option value="loved" >LOVED</option>
                            <option value="anxious">ANXIOUS</option>
                            <option value="happy" >HAPPY</option>
                            <option value="sad" >SAD</option>
                        </select>
                        <div className="errors" id="mood-error">
                            {mood === "invalid" ? "Please select a mood above" : ""}
                        </div>
                
                </div>
                {/* <label> body </label> */}


                <div className="confession-textarea-container">
                    <textarea 
                        type='text' 
                        className="confession-text-area"
                        value={body} 
                        title="Tell us What's on Your Mind"
                        placeholder="what's on your mind?"
                        onChange={changeBody} />
                    <div className="errors" id="title-error" ref={titleError}>
                            {bodyError}
                    </div>
                     
                </div>
                {sessionUser.admin && <div>
                    <input type='checkbox'  name='persist' value='persist' onChange={(e)=>setPersist(e.target.checked)}/>
                </div> }
                <input 
                    className="form-submit-button"
                    type='submit' 
                    title="First Select a Mood and Tell What's on Your Mind"
                    // style={{background: mood || body ? '#EDF0F4' }}
                    // style={{cursor: mood && body ? 'pointer' : 'not-allowed'}}
                    // disabled={!mood || !body}
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