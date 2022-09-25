import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from "@chakra-ui/layout"
import ChatBox from "./ChatBox/ChatBox"
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, _getCurrentUser } from '../../store/session'
import MyTopicsDrawer from '../TopicIndex/MyTopicsDrawer'
import { Button } from '@chakra-ui/react'
import Modal2 from './modal2'
import { fetchMessages, getAllMessages } from '../../store/messages'


function TopicPage() {
 const {topicId} = useParams();
 const dispatch = useDispatch()

  const currentUser = useSelector(_getCurrentUser)
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[])

  return (
    <div className='chat-page'>
     <MyTopicsDrawer/>
      <Box>
      

        {currentUser && <ChatBox />}
      </Box>
    </div>
  )
}
 
export default TopicPage;

