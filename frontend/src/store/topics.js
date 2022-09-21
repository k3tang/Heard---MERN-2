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

const fetchAllTopics = () => async dispatch =>{
  const res = await jwtFetch("/api/topics/")
  const topics = await res.json()
  if (res.ok){
    dispatch({type: RECEIVE_TOPICS, topics: topics})
  } else{
    console.log('problems in fetchAllTopics in store')
  }
}

const createTopic = (topicInfo) => async dispatch =>{
  console.log('IN CREATE TOPIC',topicInfo);
  const res = await jwtFetch("/api/topics/",{
    method: 'POST',
    title: topicInfo.title,
    mood: topicInfo.mood,
    userId: topicInfo.userId
  })
  const topic = await res.json()
  if (res.ok){
    dispatch(receiveTopic(topic))
  } else{
    console.log('problems in fetchAllTopics in store')
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
          newState[action.id] = action.topic
          return {...newState}
        default:
            return newState;
    }
}

export default topicsReducer;

