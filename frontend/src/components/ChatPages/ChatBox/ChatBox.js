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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {topicId} = useParams()
  const storeMessages = useSelector(getAllMessages(topicId));
  // const latestMessage = getLatestMessage(chatId)
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
 
  };

  useEffect(()=>{
   dispatch(fetchMessages(topicId))
  //  if (storeMessages) setLoading(false)
  setLoading(false);
  //  console.log('are they here?',storeMessages)
  },[currentUser,topicId])

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
 
     dispatch(addMessage(topicId, newMessage,))
     console.log(messages)
        setMessages([...messages, newMessage]);
        // console.log(messages)
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {

     dispatch(addMessage(topicId, newMessage))
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
          {storeMessages.map((message)=>(
            <div >
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
