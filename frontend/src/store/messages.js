import jwtFetch from "./jwt";

const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

const receiveMessages = (messages,chatId) =>({
  type: RECEIVE_MESSAGES,
  messages,
  chatId
})

const receiveMessage = (message,chatId) =>({
  type: RECEIVE_MESSAGE,
  message,
  chatId
})

export const getAllMessages = (state,chatId) => {
  if (!state) return null;
  if (!state.messages) return null;
  else {
  return Object.values(state.messages).filter(
    (message) => message.chatId === chatId
  );
  }
};


// export const getLatestMessage = (state, chatId) => {
//   if (!state) return null;
//   if (!state.messages) return null;
//   if (!state.messages[chatId]) return null;
//    if (!state.messages[chatId].latestMessage) return null;
//    else return state.messages[chatId].latestMessage;
// };
 export const fetchMessages = (chatId) => async(dispatch) =>{
    try {
      const data = await jwtFetch(`/api/messages/${chatId}`)
      const messages = await data.json();
      if (messages) {
        dispatch(receiveMessages(messages,chatId))
      }
    } catch (error) {}
  };

 export  const sendMessage = (content, chatId) => async (dispatch)=>{
     try {
       const data = await jwtFetch("/api/messages", {
         method: "POST",
         body: JSON.stringify({ content, chatId }),
       });
       const createdMessage = await data.json();
       if (createdMessage) {
             dispatch(receiveMessage(createdMessage,chatId))
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
        newState = {...action.messages, ...action.message}
        return newState;
      default:
        return newState;
    }
  }
    

  export default messagesReducer;