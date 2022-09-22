import React from 'react'
import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser} from "../../../store/session"
import "./Topic.css"

function Topic({topic,handleFunction}) {




 

  return (
    <div className='topic' onClick={handleFunction}>
      <div>{topic.title}</div>
      <div>{topic.mood}</div>
      {/* <div>{currentUser?.username}</div> */}
    </div>
  )
}

export default Topic;