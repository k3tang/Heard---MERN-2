import React from 'react'

function Topic({topic}) {
  return (
    <div>
      <div>{topic.title}</div>
      <div>{topic.mood}</div>
    
    </div>
  )
}

export default Topic