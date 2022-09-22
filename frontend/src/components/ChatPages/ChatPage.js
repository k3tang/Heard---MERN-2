import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from "@chakra-ui/layout"
import ChatBox from "./ChatBox/ChatBox"
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser } from '../../store/session'
import MyTopicsDrawer from '../TopicIndex/MyTopicsDrawer'


function ChatPage() {
 //get chat from store and in useEffect setChat
 const dispatch = useDispatch()
  const [chat, setChat] = useState('')
  const [user, setUser] = useState()
  const currentUser = useSelector((state)=>{
        if (!state) return null;
        else if (!state.session?.user) return null;
        else return state.session.user
  })
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[])

  useEffect(()=>{
    setUser(currentUser)
  },[currentUser])

  return (
    <div className='chat-page'>
     <MyTopicsDrawer/>
      <Box>
        {currentUser && <ChatBox />}
      </Box>
    </div>
  )
}
 
export default ChatPage;

