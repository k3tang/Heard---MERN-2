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


function TopicPage() {
 //get chat from store and in useEffect setChat
 const dispatch = useDispatch()
  const [chat, setChat] = useState('')
  const [user, setUser] = useState()
  const currentUser = useSelector(_getCurrentUser)
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[])

  useEffect(()=>{
    setUser(currentUser)
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
    </div>
  )
}
 
export default TopicPage;

