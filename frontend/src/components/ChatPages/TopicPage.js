import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ChatBox from "./ChatBox/ChatBox"
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUser, _getCurrentUser } from '../../store/session'
import MyTopicsDrawer from '../TopicIndex/MyTopicsDrawer'


import FlagModal from '../FlagModal'
import { getTopic } from "../../store/topics"

import { fetchTopic } from '../../store/topics'
import "./chatpage.css"


function TopicPage() {
 const {topicId} = useParams();
 const dispatch = useDispatch()

  const topic = useSelector(getTopic(topicId))





  const currentUser = useSelector(_getCurrentUser)
  useEffect(()=>{
    dispatch(getCurrentUser())
    dispatch(fetchTopic(topicId))
 
  },[])


  return (
    <>
     <MyTopicsDrawer />
      <div className='chat-title-container'>
        <h1 className='chat-title'>{topic?.title}</h1>
        {topic?.flagged.isFlagged && <h2 className="flagged-text" style={{color: 'red'}}>THIS TOPIC HAS BEEN FLAGGED FOR REVIEW</h2>}
      {topic && <FlagModal topic={topic}/>}
      </div>
      {currentUser && <ChatBox />}
  </>
  )
}
 
export default TopicPage;

