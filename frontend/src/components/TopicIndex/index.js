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

    // const [topics, setTopics] = useState();

  const topics = useSelector(getAllTopics);
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState();

  const currentUser = useSelector((state) => {
    if (!state) return null;
    else if (!state.session?.user) return null;
    else return state.session.user;
  });

  window.topics = topics;

  useEffect(() => {
    dispatch(fetchAllTopics());

  },[]);


    useEffect(() => {
      dispatch(getCurrentUser());
    }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const makeChat = (currentUserId, authorId, topicId) => {
    // console.log('user._id', user._id)
    // console.log('currentuserid', currentUser._id)
    // console.log('authorId', authorId)
    console.log('topic id from the chat clicked', topicId)
    dispatch(accessChat(currentUserId, authorId, topicId)).then(res => {
      history.push(`/chats/${res._id}`)
        dispatch(deleteTopic(topicId))
    console.log('chatId',res._id)
    })
    .catch((err) => {
      console.log(err);
    })

  
    
  
  };


  // const currentChat = useSelector((state) => {
  //   if (!state) return null;
  //   else if (!state.chats?.currentChat) return null;
  //   else return state.chats.currentChat;
  // });

  // useEffect(() => {
  //   if (currentChat){
  //   history.push(`/chats/${currentChat?._id}`);
  //   console.log('chatId',currentChat._id)
  //   }
  // }, [currentChat]);


  if(!user || !topics) return null;

// console.log('store topics', storeTopics)
  return (
    <>
      <MyTopicsDrawer />
      <div className="topic-container">
        <ul>
          
          {topics?.filter(topic => topic.userId !== user?._id).map ((topic=> 
                <Topic topic={topic} key={topic._id} handleFunction={() => makeChat(user._id,topic.userId,topic._id)}/>
            )) 
        }
      
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
