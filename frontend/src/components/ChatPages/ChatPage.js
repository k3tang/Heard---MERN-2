import React from 'react'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import "../../../node_modules/socket.io/client-dist/socket.io.js";

function ChatPage() {


  const [message, setMessage] = useState("")
  const [textwindow, setTextwindow] = useState("");

  const { chatId } = useParams();
 
  const socket = io.connect("http://localhost:8080");
 useEffect(()=>{

   socket.on('connect', () => console.log('THIS IS THE SOCKET ID',socket.id))

   socket.on("message de chat", (msg) => {
    setTextwindow(msg); 
  });
 },[])

 const handleSubmit= (e) => {
  e.preventDefault();
  console.log("We submitted ", message)
  socket.emit("message de chat", message);
  setMessage("");
 }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>The chat window:</p>
        <div style={{border : "2px solid green", width: "300px", height: "200px"}}>{textwindow}</div>
        </label>
        
        <label>
          <p>My new response:</p>
          <input type="text" placeholder="Enter your response" value={message} onChange={(e)=> setMessage(e.target.value)}/>
          
        </label>
        <input type="submit" value="Chat" />
      </form>

    </div>
  )
}

export default ChatPage;
