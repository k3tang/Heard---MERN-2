import { useSelector, useDispatch } from "react-redux";
// import { getCurrentChat } from "../../../store/chat";
import { useState } from "react";
import "./chatbox.css";
import { _getCurrentUser } from "../../../store/session";
import {
  FormControl,
  Input,
  Box,
  Spinner,
  Button,
  Text
} from "@chakra-ui/react";
import {useParams} from 'react-router-dom'

import {fetchMessages, getAllMessages, addMessage } from '../../../store/messages'
import { useEffect } from "react";

function ChatBox() {

  const dispatch = useDispatch()

  const currentUser = useSelector(_getCurrentUser);
  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {topicId} = useParams()

  const [timetoFetch, setTimetoFetch] = useState(true);
  const storeMessages = useSelector(getAllMessages());
  // const latestMessage = getLatestMessage(chatId)
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
     const timer = setInterval(() => {
      setTimetoFetch(true);
    }, 15000);

    return () => {
      clearInterval(timer);
    }

  }, [])

  useEffect(()=>{
    if(timetoFetch) {
      dispatch(fetchMessages(topicId)).then(() => {
        setTimetoFetch(false);  
      })
 
    }
 //  if (storeMessages) setLoading(false)
  setLoading(false);
  //  console.log('are they here?',storeMessages)
  },[currentUser,topicId, timetoFetch])

//   useEffect(()=>{
//   if(storeMessages) { 
//     setMessages(storeMessages)
//     setLoading(false);
//   } 
// },[topicId,storeMessages?.length])


window.currentUser = currentUser;
window.loading = loading;
window.storeMessages = storeMessages;


  const handleClick = (e) => {
    if (e.type === 'keydown' && e.key === "Enter" && newMessage) {
 
     dispatch(addMessage(topicId, newMessage)).then(res => setTimetoFetch(true))
        // console.log(messages)
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {

     dispatch(addMessage(topicId, newMessage)).then((res) =>
       setTimetoFetch(true)
     );

      setNewMessage("");
    }
  };
  return (
    <Box
      className="chat-box"
      d="flex"
      flexDirection={'column'}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"}
    >
      
        <div>
          {storeMessages.map((message)=> { return !!message._id && (
            <div key={message._id}>
              <Text key={message._id}>{message.sender === currentUser._id ? "You" : message.sender?.slice(-5)} said: {message.content}</Text>
              </div>
          )})
        }
        </div>
    
      <FormControl
        className="chat-container"
        onKeyDown={handleClick}
        isRequired
        mt={3}
      >
        <textarea
          className="chat-text"
          role={"textbox"}
          variant="filled"
          bg="f8f8f8"
          placeholder="be heard..."
          onChange={typingHandler}
          value={newMessage}
        />
        <button
          className="chat-send-button"
          onClick={handleClick}
        >
          send
        </button>
      </FormControl>
    </Box>
  );
}

export default ChatBox;
