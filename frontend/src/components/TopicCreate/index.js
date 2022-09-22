import "./index.css"
import { useSelector,useDispatch } from "react-redux";
import getCurrentUser from "../../store/session"
import { createTopic } from "../../store/topics"
import { useState, useEffect, } from "react";
import { Input } from "@chakra-ui/react";
const TopicCreate = () => {
    const dispatch = useDispatch();
    const [topicTitle, setTopicTitle] = useState("");
    const [mood, setMood] = useState("loved");
    const [user, setUser] = useState();

     const currentUser = useSelector((state)=>{
        if (!state) return null;
        else if (!state.session?.user) return null;
        else return state.session.user
  })
  
  useEffect(()=>{
      setUser(currentUser);
    },[currentUser])

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTopic = {
            userId: user._id,
            mood: mood,
            title: topicTitle,
        } 
        console.log(newTopic);

        dispatch(createTopic(newTopic));
    }

    useEffect(() => {
        dispatch(getCurrentUser);
    }, []);

    return (
        <>
            <div className="topic-create-container">
                <h1 className="topic-title">Create a Topic for Chat!!!</h1>
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