import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import getCurrentUser from "../../store/session";
import { createTopic } from "../../store/topics";
import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
import { clearTopicErrors } from "../../store/topics";
import { clearConfessionErrors } from "../../store/confessions";

const TopicCreate = () => {
    const dispatch = useDispatch();
    const [topicTitle, setTopicTitle] = useState("");
    const [mood, setMood] = useState("invalid");
    const errors = useSelector(state => state.errors);
     const sessionUser = useSelector(state => state.session.user);
     const history = useHistory();
     const [isFormComplete, setIsFormComplete] = useState(false);
     const [titleError, setTitleError] = useState("Make sure your topic title is at least 3 characters long!");
     const userId = sessionUser._id;
    //  const [error,setError] = useState(); 

    //  useEffect(()=>{
    //     if (errors.topics){
    //         if (errors.topics.include("is longer than"){
    //             setError ('Uh oh that topic is longer than 60 characters')
    //         }
    //     }
    //  },[errors])
     useEffect(() => {
        dispatch(getCurrentUser);
    }, []);

    useEffect(() => {
        document.querySelector(".topic-submit-button").disabled = !isFormComplete;
        document.querySelector(".topic-submit-button").style.cursor = isFormComplete ? "pointer" : "not-allowed";
    }, [isFormComplete])

    useEffect(() =>{
        dispatch(clearTopicErrors())
    }, [dispatch]);


    const changeTitle = (e) => {
        document.querySelector("#title-error").style.display = "block";
        document.querySelector("#mood-error").style.color = "red";
        setTopicTitle(e.target.value);
        if(e.target.value.length < 3) {
            setTitleError("Make sure your topic title is at least 3 characters long!");
            setIsFormComplete(false);
        } else if(e.target.value.length > 60) {
            setTitleError("Make sure your topic title is 60 characters or less!");
            setIsFormComplete(false);
        } else {
            setTitleError("");
            setIsFormComplete(mood !== "invalid");
        }
    }

    const changeMood = (e) => {
        document.querySelector("#mood-error").style.color = "red";
        setMood(e.target.value);
        setIsFormComplete(e.target.value !== "invalid" && titleError === "");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTopic = {
            userId,
            mood,
            title: topicTitle,
        } 
   

        dispatch(createTopic(newTopic)).then((res) => {
            if(res.type === 'RECEIVE_NEW_TOPIC') {
                history.push("/topic-index")
            }
        })
     

        
    }

  useEffect(() => {
    dispatch(getCurrentUser);
  }, []);

    return (
        <>
            <div className="topic-create-container">
                <div className="topic-form">
                    <form onSubmit={handleSubmit}>
                            <select className="topic-mood-dropdown" value={mood} onChange={changeMood}>
                                <option defaultValue value='invalid'> I'm feeling...</option>
                                <option value="angry">Angry</option>
                                <option value="loved">Loved</option>
                                <option value="anxious">Anxious</option>
                                <option value="happy">Happy</option>
                                <option value="sad">Sad</option>
                            </select>
                            <div className="errors" id="mood-error">
                            {mood === "invalid" ? "Please select a mood above" : ""}
                          </div>
                             <textarea className="topic-form-text" rows="2" cols="50"
                            value={topicTitle} placeholder="  Enter a title" onChange={changeTitle} />
                            <div className="errors" id="title-error">
                            {titleError}
                          </div>
                        <input className="topic-submit-button" type="submit" value="Create Topic"  />                       
                    </form>
                    <div className="topic-errors">{errors?.topics}</div>
                </div>
            </div>
        </>
    )
}

export default TopicCreate;
