import { useSelector, useDispatch } from "react-redux";
import { getCurrentChat } from "../../../store/chat";
import { useState } from "react";
import "./chatbox.css";
import { _getCurrentUser } from "../../../store/session";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Spinner,
  Button,
} from "@chakra-ui/react";

function ChatBox() {
  const dispatch = useDispatch()
  const currentChat = useSelector(getCurrentChat);
  const currentUser = useSelector(_getCurrentUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const sendMessage = (e) => {
    console.log(e.type);
  };
  const handleClick = (e) => {
    if (e.type === 'keydown' && e.key === "Enter" && newMessage) {
      console.log((e.key === 'Enter'))
      // dispatch(sendNewMessage(newMessage, currentUser._id));
      setNewMessage("");
    } else if (e.type === 'click' && newMessage) {
        // dispatch(sendNewMessage(newMessage, currentUser._id))
      setNewMessage("");
    }
  };
  return (
    <Box
      d="flex"
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
      w={"100%"}
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
        <div>Messages</div>
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
