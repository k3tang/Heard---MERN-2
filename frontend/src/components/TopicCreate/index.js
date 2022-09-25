import "./index.css"
import { useSelector,useDispatch } from "react-redux";
import getCurrentUser from "../../store/session"
import { createTopic } from "../../store/topics"
import { useState, useEffect, } from "react";
import { Input } from "@chakra-ui/react";
import { useHistory } from 'react-router-dom';
const TopicCreate = () => {
    const dispatch = useDispatch();
    const [topicTitle, setTopicTitle] = useState("");
    const [mood, setMood] = useState("loved");
    // const [user, setUser] = useState();

    const errors = useSelector(state => state.errors.session);

     const sessionUser = useSelector(state => state.session.user);

     const history = useHistory();

     const userId = sessionUser._id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTopic = {
            userId,
            mood,
            title: topicTitle,
        } 
        console.log(newTopic);

        dispatch(createTopic(newTopic)).then((res) => {
            console.log(res);
            history.push("/topic-index");
        }).catch((err) => console.log(`Error ${err.status}: ${err.statusText}`));

        
    }

    useEffect(() => {
        dispatch(getCurrentUser);
    }, []);

    return (
        <>
            <div className="topic-create-container">
                <h1 className="topic-title">let's start a discussion</h1>
                <div className="topic-form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>
                            Enter a title!
                            </p>
                            <Input 
                            w="40%"
                            type="text" value={topicTitle} onChange={(e) => setTopicTitle(e.target.value)} />
                        <label>
                            <p>
                            Choose a mood:
                            </p>
                            <select value={mood} onChange={(e) => setMood(e.target.value)}>
                            
                                <option value="angry">Angry</option>
                                <option value="loved">Loved</option>
                                <option value="anxious">Anxious</option>
                                <option value="happy">Happy</option>
                                <option value="sad">Sad</option>
                            </select>
                        </label>
                        <input type="submit" value="Create Topic" />                       
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TopicCreate;