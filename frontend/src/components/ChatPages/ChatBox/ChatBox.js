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
  Text,
  useToast
} from "@chakra-ui/react";
import {useParams} from 'react-router-dom'
import jwtFetch from "../../../store/jwt";
import {sendMessage, fetchMessages, getAllMessages, getLatestMessage} from '../../../store/messages'
import { useEffect } from "react";

function ChatBox() {

  const dispatch = useDispatch()
  const currentChat = useSelector(getCurrentChat);
  const currentUser = useSelector(_getCurrentUser);
  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {chatId} = useParams()
  const [timetoFetch, setTimetoFetch] = useState(false);
  const messages = useSelector((state)=>getAllMessages(state,chatId))

  const timer = setInterval(() => {
    setTimetoFetch(true);
  }, 5000);
  // const latestMessage = getLatestMessage(chatId)
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
 
  };

  useEffect(()=> {
    if(timetoFetch) dispatch(fetchMessages(chatId)).then(()=> {
      setTimetoFetch(false);
    });
  }, [timetoFetch]);

  window.currentUser = currentUser;
  window.messages = messages;

  useEffect(()=>{
   dispatch(fetchMessages(chatId))
   if (messages) setLoading(false)
  //  console.log('are they here?',storeMessages)
  },[chatId])



  // if(!messages) return null;

 
  const handleClick = (e) => {
    if (e.type === 'keydown' && e.key === "Enter" && newMessage) {
 
     dispatch(sendMessage(newMessage,chatId))
    //  console.log(messages)
        // console.log(messages)
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {

     dispatch(sendMessage(newMessage,chatId))
      setNewMessage("");
      setTimetoFetch(true); 
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
      {!messages ? (
        <Spinner
          size="xl"
          speed="0.9s"
          emptyColor="gray.200"
          alignSelf="center"
          color="blue.400"
        />
      ) : (
        <div>
          {messages?.map((message)=>(
            <div className={currentUser._id === message._id ? 'current-user-text' : 'listener-text'}>
              <Text>{message.content}</Text>
              </div>
          ))
        }
        </div>
      )}
      <Box
      pos="absolute"
      bottom="0"
      
      >
        <FormControl
          onKeyDown={handleClick}
          isRequired
          mt={3}
          display="flex"
          mb="0"
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
    </Box>
  );
}

export default ChatBox;
