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
    const [topics, setTopics] = useState();
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
    dispatch(fetchAllTopics());
    if (user) dispatch(fetchChatsbyUser(user.id));
  },[]);

  useEffect(() => {
    setMyChats(storeChats);
  }, [storeChats]);

  useEffect(()=>{
    setTopics(Object.values(storeTopics))
  },[storeTopics])
    useEffect(() => {
      dispatch(getCurrentUser());
    }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const makeChat = (currentUserId, authorId, topicId) => {
    dispatch(accessChat(user._id, authorId, topicId));
  };

  useEffect(() => {
    // console.log('does chat have id?',currentChat._id)
    if (currentChat) history.push(`/chats/${currentChat?._id}`);
  }, [currentChat]);
console.log('store topics', storeTopics)
  return (
    <>
      <MyTopicsDrawer />
      <div className="topic-container">
        <ul>
          
          {topics && topics?.map ((topic=> 
                <Topic topic={topic} handleFunction={() => makeChat(user.id,topic.userId,topic._id)}/>
            )) 
        }
      
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
