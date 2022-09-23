import { useSelector, useDispatch } from "react-redux";
import { getCurrentChat } from "../../../store/chat";
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

import {sendMessage, fetchMessages, getAllMessages, getLatestMessage} from '../../../store/messages'
import { useEffect } from "react";

function ChatBox() {

  const dispatch = useDispatch()
  const currentChat = useSelector(getCurrentChat);
  const currentUser = useSelector(_getCurrentUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {chatId} = useParams()
  const storeMessages = useSelector((state)=>getAllMessages(state,chatId))
  // const latestMessage = getLatestMessage(chatId)
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
 
  };

  useEffect(()=>{
   dispatch(fetchMessages(chatId))
   if (storeMessages) setLoading(false)
  //  console.log('are they here?',storeMessages)
  },[currentUser,chatId])

  useEffect(()=>{
  if(storeMessages) { 
    setMessages(storeMessages)
    setLoading(false);
  } 
},[chatId,storeMessages?.length])




 
  const handleClick = (e) => {
    if (e.type === 'keydown' && e.key === "Enter" && newMessage) {
 
     dispatch(sendMessage(newMessage,chatId))
     console.log(messages)
        setMessages([...messages, newMessage]);
        // console.log(messages)
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {

     dispatch(sendMessage(newMessage,chatId))
        setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };
  return (
    <Box
      d="flex"
      flexDirection={'column'}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100vh"}
      w={"100%"}
      bg='#f2f2f2'
    >
      {loading ? (
        <Spinner
          size="xl"
          speed="0.9s"
          emptyColor="gray.200"
          alignSelf="center"
          color="blue.400"
        />
      ) : (
        <div>
          {messages.map((message)=>(
            <div className={currentUser._id === message._id ? 'current-user-text' : 'listener-text'}>
              <Text>{message.content}</Text>
              </div>
          ))
        }
        </div>
      )}
      <FormControl
        onKeyDown={handleClick}
        isRequired
        mt={3}
        display="flex"
      >
        <Input
          variant="filled"
          bg="f8f8f8"
          placeholder="be heard..."
          onChange={typingHandler}
          value={newMessage}
        />
        <Button
          onClick={handleClick}
          colorScheme={"teal"}
          size="md"
          variant="outline"
        >
          send
        </Button>
      </FormControl>
    </Box>
  );
}

export default ChatBox;
