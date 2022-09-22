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

  const topics = useSelector(getAllTopics);

  const currentUser = useSelector((state) => {
    if (!state) return null;
    else if (!state.session?.user) return null;
    else return state.session.user;
  });

  useEffect(() => {
    dispatch(getCurrentUser()).catch(() => console.log("uh oh"));
  }, []);

  window.topics = topics;
  window.currentUser = currentUser;

  useEffect(() => {
    dispatch(fetchAllTopics());
    if (currentUser) dispatch(fetchChatsbyUser(currentUser._id));
  }, [currentUser]);

  useEffect(() => {
    setMyChats(storeChats);
  }, [storeChats]);
  


  const makeChat = (authorId, topicId) => {
    dispatch(accessChat(authorId, currentUser._id, topicId));
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
          {topics && topics.map( (topic) => 
            <Topic key={topic._id} topic={topic} handleFunction={() => makeChat(topic.userId, topic._id)} />
          ) }
          

          {/* <Topic
            topic={{
              id: 1,
              title: "I am sad",
              mood: "blue",
              userId: "632a2f571b035eb8b3cbf3b6",
            }}
            handleFunction={() => makeChat("632a2f571b035eb8b3cbf3b6", 1)}
          /> */}
          {/* {
                    topics?.map(topic => <li key={topic._id}><Link to={`/talk/${topic._id}`}>{topic.title}</Link></li>)
                    } */}
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
