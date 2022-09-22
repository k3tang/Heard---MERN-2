import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TopicIndex.css";
// import fetchAllTopics from "../../store/topics";
// import { getAllTopics } from "../../store/topics";
import { useHistory } from "react-router-dom";
import MyTopicsDrawer from "./MyTopicsDrawer";
import Topic from "./Topic";
import { getCurrentUser } from "../../store/session";
import { accessChat, getAllChats, fetchChatsbyUser } from "../../store/chat";
import { getAllTopics, fetchAllTopics } from "../../store/topics";

const TopicIndex = () => {
  const storeChats = useSelector((state) => getAllChats(state));
  //   const [loadingChat, setLoadingChat] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const [myChats, setMyChats] = useState();
  const currentChat = useSelector((state) => {
    if (!state) return null;
    else if (!state.chats?.currentChat) return null;
    else return state.chats.currentChat;
  });
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();

  const storeTopics = useSelector(getAllTopics);

  const currentUser = useSelector((state) => {
    if (!state) return null;
    else if (!state.session?.user) return null;
    else return state.session.user;
  });

  window.topics = topics;

  useEffect(() => {
    dispatch(fetchAllTopics);
    if (user) dispatch(fetchChatsbyUser(user.id));
  }, []);

  useEffect(() => {
    setMyChats(storeChats);
  }, [storeChats]);
  
  useEffect(()=>{
    setTpics(storeTopics)
  },[storeTopics])
  //   useEffect(() => {
  //     dispatch(getCurrentUser());
  //   }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const makeChat = (authorId, topicId) => {
    dispatch(accessChat(authorId, user._id, topicId));
  };

  useEffect(() => {
    if (currentChat) history.push(`/chats/${currentChat?.id}`);
  }, [currentChat]);

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
            topic={{
              id: 1,
              title: "I am sad",
              mood: "blue",
              userId: "632a2f571b035eb8b3cbf3b6",
            }}
            handleFunction={() => makeChat("632a2f571b035eb8b3cbf3b6", 1)}
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
