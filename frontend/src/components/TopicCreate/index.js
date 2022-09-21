import "./index.css"
import { useSelector,useDispatch } from "react-redux";
import getCurrentUser from "../../store/session"
import createTopic from "../../store/topics"
import { useState, useEffect, } from "react";

const TopicCreate = () => {
    const dispatch = useDispatch();
    const [chatTitle, setChatTitle] = useState("");
    const [mood, setMood] = useState("loved");
    const [user, setUser] = useState()
     const currentUser = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTopic = {
            userId: currentUser?.id,
            mood: mood,
            title: chatTitle,
        } 
        console.log(newTopic);

        dispatch(createTopic(newTopic));
    }

    useEffect(() => {
        dispatch(getCurrentUser);

            setUser(currentUser);
    }, []);

    return (
        <>
            <div className="topic-create-container">
                <h1 className="topic-title">Create a message request</h1>
                <div className="topic-form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>
                            Enter a title!
                            </p>
                            <input type="text" value={chatTitle} onChange={(e) => setChatTitle(e.target.value)} />
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
                        <input type="submit" value="Create Chat Request" />                       
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}

export default TopicCreate;