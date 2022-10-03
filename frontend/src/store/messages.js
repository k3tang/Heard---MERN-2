import jwtFetch from "./jwt";

const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE' // only for pushing messages. Editing or deleting will trigger RECEIVE_MESSAGES

const receiveMessages = (messages) =>({
  type: RECEIVE_MESSAGES,
  messages
})

const receiveMessage = (message) =>({
  type: RECEIVE_MESSAGE,
  message
 
})

export const getAllMessages = () => (state) => {
  if (!state) return null;
  if (!state.messages) return null;
  else {
  return Object.values(state.messages)
  // .filter((message) => message.topicId === topicId);
  }
};


 export const fetchMessages = (topicId) => async(dispatch) =>{
    try {
      const data = await jwtFetch(`/api/messages/${topicId}`)
      const messages = await data.json();
      if (messages) {
        dispatch(receiveMessages(messages));
        return messages;
      }
    } catch (error) {}
  };

 export  const addMessage = (topicId, content) => async (dispatch)=>{
     try {
       const data = await jwtFetch(`/api/messages/`, {
         method: "POST",
         body: JSON.stringify({ topicId, content }),
       });
       const createdMessage = await data.json();
       if (createdMessage) {
             dispatch(receiveMessage(createdMessage))
             return createdMessage;
       }
     } catch (error) {}
   };

  const messagesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = { ...state };

    switch (action.type) {
      case RECEIVE_MESSAGES:
        newState = {...action.messages}
        return newState
      case RECEIVE_MESSAGE:
        newState = {...state, ...action.message}
        return newState;
      default:
        return newState;
    }
  }
    

  export default messagesReducer;