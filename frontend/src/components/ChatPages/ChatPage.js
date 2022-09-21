import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from "@chakra-ui/layout"
import ChatBox from "./ChatBox/ChatBox"
import { useSelector } from 'react-redux'

import { getCurrentUser } from '../../store/session'


function ChatPage() {
 //get chat from store and in useEffect setChat
  const [chat, setChat] = useState('')
  const [user, setUser] = useState()
  const currentUser = useSelector((state)=>{
        if (!state) return null;
        else if (!state.session?.user) return null;
        else return state.session.user
  })

  useEffect(()=>{
    dispatchEvent(getCurrentUser())
    setUser(currentUser)
  },[currentUser])

  return (
    <div className='chat-page'>
      {/* {user && <SideDrawer/>} */}
      <Box>
        {/* {user && <MyTopics /> } LEAVE THIS FOR LATER. if we want a side drawer with a user's topics*/}
        {currentUser && <ChatBox />}
      </Box>
    </div>
  )
}
 
export default ChatPage;
