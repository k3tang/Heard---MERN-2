import React from 'react'
import "./Topic.css"

function Topic({topic,handleFunction}) {

  return (
    <div className='topic' onClick={handleFunction}>
      <div>{topic.title}</div>
      <div>{topic.mood}</div>
      <div>{topic.userId?.username}</div>
    </div>
  )
}

export default Topic;