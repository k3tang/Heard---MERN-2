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

function ChatBox() {
  const toast = useToast
  const dispatch = useDispatch()
  const currentChat = useSelector(getCurrentChat);
  const currentUser = useSelector(_getCurrentUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const {chatId} = useParams()
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = async(content, userId, chatId) => {
    // console.log('pre-fetch', content,senderId, chatId)

    try {
      const data = await jwtFetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({content,userId,chatId})
        }
      );
      const createdMessage = await data.json()
      if (createdMessage) {
        setMessages([ ...messages, createdMessage])
      }
    } catch (error) {
      //  toast({
      //    title: "An error occurred.",
      //    description: "Your message didnt' send :(",
      //    status: "error",
      //    duration: 8000,
      //    isClosable: true,
      //  });
    }
  };
  const handleClick = (e) => {
    if (e.type === 'keydown' && e.key === "Enter" && newMessage) {
      console.log((e.key === 'Enter'))
      // dispatch(sendNewMessage(newMessage, currentUser._id));
      sendMessage(newMessage,chatId,currentUser._id)
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {
        // dispatch(sendNewMessage(newMessage, currentUser._id))
         sendMessage(newMessage, chatId, currentUser._id);
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
          {messages && messages.map((message)=>(
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
