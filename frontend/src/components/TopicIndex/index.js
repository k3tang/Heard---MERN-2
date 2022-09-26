import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TopicIndex.css";


import { useHistory } from "react-router-dom";
import MyTopicsDrawer from "./MyTopicsDrawer";
import Topic from "./Topic";
import { getCurrentUser } from "../../store/session";

import { getAllTopics, fetchAllTopics, fetchTopic } from "../../store/topics";

const TopicIndex = () => {

    // const [topics, setTopics] = useState();

  const topics = useSelector(getAllTopics);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const makeChat = (topicId) => {
    dispatch(fetchTopic(topicId)).then(res => {
      history.push(`/topic/${res._id}`);
    
    }).catch((err) => {
      console.log(err);
    })
  
  };






  if(!currentUser || !topics) return null;


  return (
    <>
      <MyTopicsDrawer />
      <div className="topic-container">
        <ul>
          <li className="topic-listing">
            {topics?.map ((topic=> 
                  <Topic topic={topic} key={topic._id} handleFunction={() => makeChat(topic._id)}/>
              )) 
            }
          </li>
        </ul>
      </div>
    </>
  );
};

export default TopicIndex;
