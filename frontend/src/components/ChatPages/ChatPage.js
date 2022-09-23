import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from "@chakra-ui/layout"
import ChatBox from "./ChatBox/ChatBox"
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, _getCurrentUser } from '../../store/session'
import MyTopicsDrawer from '../TopicIndex/MyTopicsDrawer'
import { Button } from '@chakra-ui/react'
import Modal2 from './modal2'
import { fetchChatsbyUser, getCurrentChat } from '../../store/chat'



function ChatPage() {

  const { chatId } = useParams();

  const inProduction = process.env.NODE_ENV === 'production';
 
 //get chat from store and in useEffect setChat
 const dispatch = useDispatch()
  const chat = useSelector(getCurrentChat);
  // const [user, setUser] = useState()
  const currentUser = useSelector(_getCurrentUser)
  useEffect(()=>{
    dispatch(getCurrentUser())
  }, [])

  useEffect(()=>{
    if(currentUser) dispatch(fetchChatsbyUser(currentUser._id));
  },[currentUser])

  const handleClick=(e)=>{
    
  }
  return (
    <div className='chat-page'>
     <MyTopicsDrawer/>
      <Box>
        <Modal2/>

        {currentUser && <ChatBox />}
      </Box>
      { chat && !inProduction && <p>
        {`chat id: ${chat._id}, current user: ${currentUser._id}, participant1: ${chat.users[0]}, participant2: ${chat.users[1]}`}
        </p>}
    </div>
  )
}
 
export default ChatPage;

