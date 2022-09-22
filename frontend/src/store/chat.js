import jwtFetch from "./jwt";

/*
Accessing a chat is when the user who created the topic accepts the chat request and will begin chatting

Accessing a chat involves accessing the chat defined in the chats state at the key of "current"

Getting a user's chats are the chats that are active and created by the user.


*/
export const getCurrentChat =(state) =>{
        if (!state) return null;
      else if (!state.chats?.currentChat) return null;
      else return state.chats.currentChat;
    
}

export const getAllChats =(state)=>{
if (!state) return null;
if (!state.chats) return null;
else return state.chats
}

export const accessChat = (currentUserId, userId, topicId) => async (dispatch) => {
  try {
    // setLoadingChat(true)
    const res = await jwtFetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({ userId, currentUserId, topicId }),
    });
    const chat = await res.json();
    dispatch(receiveCurrentChat(chat));
  } catch (error) {}
};

export const fetchChatsbyUser = (userId) => async (dispatch) => {

    const res = await jwtFetch(`/api/chats/user/${userId}`);
    const chats = await res.json();
    dispatch(receiveChats(chats));
}

export const RECEIVE_CURRENT_CHAT = 'RECEIVE_CURRENT_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const RECEIVE_CHATS = 'RECEIVE_CHATS';

const receiveChats = (chats) => ({
    type: RECEIVE_CHATS,
    chats
})

export const receiveCurrentChat = (chat) => ({
    type: RECEIVE_CURRENT_CHAT,
    chat
})

export const removeChat = (chatId) => ({
    type: REMOVE_CHAT,
    chatId
})


// state {
//   chats{
//     id{ id, title, users

//     }
//     secletedChat{

//     }
//   }
// }

const chatsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = { ...state };
  console.log(action);
  switch (action.type) {
    case RECEIVE_CHATS:
      return { ...newState, ...action.chats };
    case RECEIVE_CURRENT_CHAT:
      // if (!newState['currentChat']){
      newState['currentChat'] = action.chat;
      // } else{

      // }
      return { ...newState };
    case REMOVE_CHAT:
        delete newState[action.chatId];
        return newState;
    default:
      return newState;
  }
};
export default chatsReducer;