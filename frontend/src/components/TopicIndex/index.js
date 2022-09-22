import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TopicIndex.css";
import fetchAllTopics from "../../store/topics";
import { getAllTopics } from "../../store/topics";
import { useHistory } from "react-router-dom";
import MyTopicsDrawer from "./MyTopicsDrawer";
import Topic from "./Topic";
import {getCurrentUser} from "../../store/session";
import {accessChat} from "../../store/chat"

const TopicIndex = () => {
  const storeTopics = useSelector(getAllTopics);
  const [loadingChat, setLoadingChat] = useState();
  const dispatch = useDispatch();
    const history = useHistory();
  const [topic, setTopics] = useState({
    id: 1,
    title: "I am sad",
    mood: "blue",
    userId: 2,
  });

  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(fetchAllTopics);
  }, []);

  useEffect(() => {
    setTopics(storeTopics);
  }, [storeTopics]);

  const currentUser = useSelector((state) => {
    if (!state) return null;
    else if (!state.session?.user) return null;
    else return state.session.user;
  });

    const currentChat = useSelector((state) => {
      if (!state) return null;
      else if (!state.chats?.currentChat) return null;
      else return state.chats.currentChat
    });

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const makeChat = (authorId,mood) => {
    dispatch(accessChat(authorId, user._id,mood));
  };

  useEffect(()=>{
      if (currentChat)  history.push(`/chats/${currentChat?.id}`)
  },[currentChat])

  return (
    <>
      <MyTopicsDrawer />
      <div className="topic-container">
        <ul>
          List of topics
          {/* topics.map (topic)=>{
            return <Topic topic={topic} handleFunction={() => makeChat(topic.userId,topic.mood)}
          } */}
          <Topic
           
            topic={{ id: 1, title: "I am sad", mood: "blue", userId: "632a2f571b035eb8b3cbf3b6" }}
            handleFunction={() => makeChat("632a2f571b035eb8b3cbf3b6","sad")}
          />
          {/* {
                    topics?.map(topic => <li key={topic._id}><Link to={`/talk/${topic._id}`}>{topic.title}</Link></li>)
                    } */}
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
