import React from 'react'
import "./Topic.css"

function Topic({topic,handleFunction}) {

  return (
    <div className='topic' onClick={handleFunction}>
      <div>{topic.title}</div>
      <div>{topic.mood}</div>
      <div>UserId: {topic.userId.slice(-5)}</div>
    </div>
  )
}

export default Topic;