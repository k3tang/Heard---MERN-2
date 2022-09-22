import { useSelector } from "react-redux"
import { getCurrentChat } from "../../../store/chat"
import { useState } from 'react'
import "./chatbox.css"
import { Box,Spinner } from "@chakra-ui/react"
import { _getCurrentUser } from "../../../store/session"
function ChatBox() {
  const currentChat = useSelector(getCurrentChat)
  const currentUser = useSelector(_getCurrentUser)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  return (
    <Box
      d="flex"
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
      w={"100%"}
    >
      { loading ? 
      <Spinner size="xl" speed='0.9s' emptyColor="gray.200" color="blue.400" />
      :
      <></>
       }

    </Box>
  );
}

export default ChatBox