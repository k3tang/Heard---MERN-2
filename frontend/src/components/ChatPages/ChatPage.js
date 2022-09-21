import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from "@chakra-ui/layout"

function ChatPage() {
 //get chat from store and in useEffect setChat
  const [chat, setChat] = useState('')


  useEffect(()=>{
    // dispatch(fetchChat)
  })
  return (
    <div className='chat-page'>
      {/* {user && <SideDrawer/>} */}
      <Box>
        {/* {user && <MyTopics /> } LEAVE THIS FOR LATER. if we want a side drawer with a user's topics*/}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}
 
export default ChatPage;
