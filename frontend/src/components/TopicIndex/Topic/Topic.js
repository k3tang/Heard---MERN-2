import React from 'react'
import { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser} from "../../../store/session"
import "./Topic.css"

function Topic({topic,handleFunction}) {

  const dispatch = useDispatch();
    const [user, setUser] = useState()
  const currentUser = useSelector((state)=>{
        if (!state) return null;
        else if (!state.session?.user) return null;
        else return state.session.user
  })


 

  return (
    <div className='topic' onClick={handleFunction}>
      <div>{topic.title}</div>
      <div>{topic.mood}</div>
      <div>{currentUser?.username}</div>
    </div>
  )
}

export default Topic;