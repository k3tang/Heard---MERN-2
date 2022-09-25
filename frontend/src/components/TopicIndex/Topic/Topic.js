import React from 'react'
import "./Topic.css"

function Topic({topic,handleFunction}) {


  const color = () => {
    if (topic.mood === "angry") {
    return "red"
  } else if (topic.mood === "loved") {
    return "pink"
  } else if (topic.mood === "anxious") {
    return "green"
  } else if (topic.mood === "happy") {
      return "yellow"
  } else if (topic.mood === "sad") {
      return "blue"
  }}


  return (
    <div className={color()} onClick={handleFunction}>
      <div className='topic-title'>{topic.title}</div>
      <div className='topic-mood'>{topic.mood}</div>
      {/* <div>UserId: {topic.userId.slice(-5)}</div> */}
    </div>
  )
}

export default Topic;