import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_TOPICS = "RECEIVE_TOPICS"
const RECEIVE_TOPIC = "RECEIVE_TOPIC"
const REMOVE_TOPIC = "REMOVE_TOPIC"

const receiveTopic = (topic)=>({
  type: RECEIVE_TOPIC,
  topic
})

const removeTopic = (topicId)=>({
  type: REMOVE_TOPIC,
  topicId
})


export const getTopic = (topicId) => (state) => {
  if(!state.topics) return null;
  if(!state.topics[topicId]) return null;
  return state.topics[topicId];
}

export const getAllTopics =  (state) => {
        if (!state) return [];
        else if (!state.topics) return [];
        else {
          // console.log(Object.values(state.topics)); 
          return Object.values(state.topics);
        }
    }

export const fetchAllTopics = () => async dispatch =>{
  try {
    const res = await jwtFetch("/api/topics/")
    const topics = await res.json()
    dispatch({type: RECEIVE_TOPICS, topics: topics})
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // insert error handling here
      // dispatch(receiveErrors(resBody.errors));
    }
  }
  
}

export const fetchTopic = (topicId) => async dispatch => {
  try {
    const res = await jwtFetch(`/api/topics/${topicId}`);
    const topic = await res.json();
    dispatch(receiveTopic(topic));

    return topic;
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // insert error handling here
      // dispatch(receiveErrors(resBody.errors));
    }
  }
}

export const fetchTopicsbyUser = (userId) => async dispatch =>{
  try {
    const res = await jwtFetch(`/api/topics/user/${userId}`)
    const topics = await res.json()
    dispatch({type: RECEIVE_TOPICS, topics: topics})
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      // insert error handling here
      // dispatch(receiveErrors(resBody.errors));
    }
  }
  
}

export const createTopic = (topicInfo) => async dispatch =>{ // contains ownerId, title, mood
  // console.log('IN CREATE TOPIC',topicInfo);
  const res = await jwtFetch("/api/topics/",{
    method: 'POST',
    body: JSON.stringify(topicInfo)
  })
  const topic = await res.json()
  // console.log(topic._id);
  if (res.ok){
    dispatch(receiveTopic(topic))

    return topic;
  } else{
    console.log('problems in fetching topic into store')
  }
}

export const editTopic = (updatedTopic) => async dispatch =>{ // contains userId, title, mood
  console.log('IN EDIT TOPIC',updatedTopic);
  const res = await jwtFetch(`/api/topics/${updatedTopic._id}`,{
    method: 'PATCH',
    body: JSON.stringify(updatedTopic)
  })
  const topic = await res.json()
  // console.log(topic._id);
  if (res.ok){
    dispatch(receiveTopic(topic))

    return topic;
  } else{
    console.log('problems in fetching topic into store')
  }
}

export const deleteTopic = (topicId) => async dispatch => {
  const res = await jwtFetch(`/api/topics/${topicId}`,{
    method: 'DELETE'
  })
  const topic = await res.json()
  // console.log(topic._id);
  if (res.ok){
    dispatch(removeTopic(topic._id))

    return topic;
  } else{
    console.log('problems in fetching topic into store')
  }

}


        
const topicsReducer = (state = {}, action) => { 
  Object.freeze(state)
  const newState = {...state}
    switch (action.type) {
        case RECEIVE_TOPICS:
            for(let topic of action.topics) {
              newState[topic._id] = topic;
            }
            return newState;
        case RECEIVE_TOPIC:
          newState[action.topic._id] = action.topic
          return {...newState}
        case REMOVE_TOPIC:
          delete newState[action.topicId];
          return newState;
        default:
            return newState;
    }
}

export default topicsReducer;

