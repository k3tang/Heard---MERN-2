import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';


const RECEIVE_TOPICS = "RECEIVE_TOPICS"
const RECEIVE_TOPIC = "RECEIVE_TOPIC"
const REMOVE_TOPIC = "REMOVE_TOPIC"
const RECEIVE_TOPIC_ERRORS = "RECEIVE_TOPIC_ERRORS"
const CLEAR_TOPIC_ERRORS = "CLEAR_TOPIC_ERRORS"
const RECEIVE_NEW_TOPIC = "RECEIVE_NEW_TOPIC"

const receiveTopic = (topic)=>({
  type: RECEIVE_TOPIC,
  topic
})

const removeTopic = (topicId)=>({
  type: REMOVE_TOPIC,
  topicId
})



const receiveNewTopic = topic => ({
  type: RECEIVE_NEW_TOPIC,
  topic
})

const receiveErrors = errors => ({
  type: RECEIVE_TOPIC_ERRORS,
  errors
});

export const clearTopicErrors = errors => ({
  type: CLEAR_TOPIC_ERRORS,
  errors
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



export const createTopic = topicData => async dispatch =>{
  try {
    const res = await jwtFetch("/api/topics/",{
      method: 'POST',
      body: JSON.stringify(topicData)
    })
    const topic = await res.json()

    return dispatch(receiveNewTopic(topic))
  } catch (err) {
    const resBody = await err.json();

    
    if (resBody.statusCode === 500) {
      return dispatch(receiveErrors(resBody.message));
    } else {
      
    }
  }
}

export const editTopic = (updatedTopic) => async dispatch =>{ // contains userId, title, mood
 
  const res = await jwtFetch(`/api/topics/${updatedTopic._id}`,{
    method: 'PATCH',
    body: JSON.stringify(updatedTopic)
  })
  const topic = await res.json()

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

  if (res.ok){
    dispatch(removeTopic(topic._id))

    return topic;
  } else{
    console.log('problems in fetching topic into store')
  }

}

const nullErrors = null;

export const topicErrorsReducer = (state = nullErrors, action ) => {
  switch(action.type) {
    case RECEIVE_TOPIC_ERRORS:
      return action.errors;
    case CLEAR_TOPIC_ERRORS:
      return nullErrors;
    default: 
      return state;

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

