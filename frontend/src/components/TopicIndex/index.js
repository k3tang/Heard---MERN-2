import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TopicIndex.css"
import fetchAllTopics from "../../store/topics"
import { getAllTopics } from "../../store/topics";
import {Link} from "react-router-dom"
import MyTopicsDrawer from "./MyTopicsDrawer";
import Topic from "./Topic";


const TopicIndex = () => {
    const storeTopics = useSelector(getAllTopics)

    const dispatch = useDispatch();
    const [topic, setTopics] = useState({id: 1,title: 'I am sad', mood: "blue", userId: 2});

    useEffect(() => {
        dispatch(fetchAllTopics)
        setTopics(storeTopics)
    },[storeTopics])
    
    return (
    <>
      <MyTopicsDrawer/>
            <div className="topic-container">
                <ul>List of topics
                    <Topic topic={ {id: 1,title: 'I am sad', mood: "blue", userId: 2}}/>
                    {/* {
                    topics?.map(topic => <li key={topic._id}><Link to={`/talk/${topic._id}`}>{topic.title}</Link></li>)
                    } */}
                    </ul>
            </div> 
        </>
    )
}

export default TopicIndex;