import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_TOPICS = "RECEIVE_TOPICS"
const RECEIVE_TOPIC = "RECEIVE_TOPIC"

const receiveTopic = (topic)=>({
  type: RECEIVE_TOPIC,
  topic
})

export const getAllTopics =  (state) => {
        if (!state) return null;
        else if (!state.topics) return null;
        else return state.topics
    }

export const fetchAllTopics = () => async dispatch =>{
  const res = await jwtFetch("/api/topics/")
  const topics = await res.json()
  console.log(topics);
  if (res.ok){
    dispatch({type: RECEIVE_TOPICS, topics: topics})
  } else{
    console.log('problems in fetchAllTopics in store')
  }
}

export const createTopic = (topicInfo) => async dispatch =>{
  // console.log('IN CREATE TOPIC',topicInfo);
  const res = await jwtFetch("/api/topics/",{
    method: 'POST',
    body: JSON.stringify(topicInfo)
  })
  const topic = await res.json()
  // console.log(topic);
  if (res.ok){
    dispatch(receiveTopic(topic))

    return topic;
  } else{
    console.log('problems in fetching topic into store')
  }
}


        
const topicsReducer = (state = {}, action) => { 
  Object.freeze(state)
  const newState = {...state}
    console.log(action);
    switch (action.type) {
        case RECEIVE_TOPICS:
            return {...newState, ...action.topics}
        case RECEIVE_TOPIC:
          newState[action.topic.id] = action.topic
          return {...newState}
        default:
            return newState;
    }
}

export default topicsReducer;

