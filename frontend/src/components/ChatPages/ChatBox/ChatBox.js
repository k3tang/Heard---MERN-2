import { useSelector } from "react-redux"
import { getCurrentChat } from "../../../store/chat"
import "./chatbox.css"
import { Box } from "@chakra-ui/react"
import { _getCurrentUser } from "../../../store/session"
function ChatBox() {
  const currentChat = useSelector(getCurrentChat)
  const currentUser = useSelector(_getCurrentUser)
  return (
    <Box
      d="flex"
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
      w={"100%"}
    ></Box>
  );
}

export default ChatBox