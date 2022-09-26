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

import FlagModal from '../FlagModal'
import { getTopic } from "../../store/topics"

import { fetchTopic } from '../../store/topics'



function TopicPage() {
 const {topicId} = useParams();
 const dispatch = useDispatch()

  const topic = useSelector((state)=>getTopic(state,topicId))


//  const [title, set Title] = useState("");


  const currentUser = useSelector(_getCurrentUser)
  useEffect(()=>{
    dispatch(getCurrentUser())
    // dispatch(fetchTopic(topicId)).then(res => {
    //   setTitle(res.title);
    // });
  },[])


  return (
    <div className='chat-page'>
     <MyTopicsDrawer/>
     <Box>
      <h1>{topic?.title}</h1>
     </Box>
      <Box>
    
        {currentUser && <ChatBox />}
      </Box>
      <FlagModal topic={topic}/>
    </div>
  )
}
 
export default TopicPage;

