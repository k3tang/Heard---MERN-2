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
import { getAllTopics, fetchAllTopics, deleteTopic } from "../../store/topics";

const TopicIndex = () => {
  const storeChats = useSelector((state) => getAllChats(state));
    // const [topics, setTopics] = useState();

  const topics = useSelector(getAllTopics);
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

    useEffect(() => {
      dispatch(getCurrentUser());
    }, []);

  useEffect(() => {
    console.log(currentUser);
    setUser(currentUser);
  }, [currentUser]);

  const makeChat = (currentUserId, authorId, topicId) => {
    console.log('user._id', user._id)
    console.log('currentuserid', currentUser._id)
    console.log('authorId', authorId)
    dispatch(accessChat(currentUserId, authorId, topicId));
    dispatch(deleteTopic(topicId));
  
  };

  
  useEffect(() => {
    if (currentChat){
    history.push(`/chats/${currentChat?._id}`);
    console.log('chatId',currentChat._id)
    }
      

  }, [currentChat]);

  if(!topics) return null;

// console.log('store topics', storeTopics)
  return (
    <>
      <MyTopicsDrawer />
      <div className="topic-container">
        <ul>
          
          {topics?.filter(topic => topic.userId !== user?._id).map ((topic=> 
                <Topic topic={topic} handleFunction={() => makeChat(user._id,topic.userId,topic._id)}/>
            )) 
        }
      
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
