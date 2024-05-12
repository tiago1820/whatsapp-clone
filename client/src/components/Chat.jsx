import { useState, useEffect } from 'react'
import io from "socket.io-client";
import axios from 'axios';
import { Navbar } from './Navbar';


const socket = io("/");

export const Chat = () => {
  const senderId = "26b83d18-b2a0-43ed-babc-c49ecdb8f567";
  const chatId = "1dba80ca-d785-443c-8ca2-1c4f7c84ffd1";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      content: message,
      chatId,
      senderId
    }

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjZiODNkMTgtYjJhMC00M2VkLWJhYmMtYzQ5ZWNkYjhmNTY3IiwidXNlck5hbWUiOiJwYXVsYSIsInByb2ZpbGVJbWFnZSI6bnVsbCwiZW1haWwiOiJwYXVsYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ4bXFVLy5TaWFsc0tyM1RwbmV5SGcuZks1TmdPZzhKR1NjY2pEOVRFbGhmaER2ZUNHYkNPbSIsIm1vYmlsZSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wM1QyMzo0MzoyNi44MjRaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wM1QyMzo0MzoyNi44MjRaIn0sImlhdCI6MTcxNTI5NzA2N30.-TmXKp_Xkc2cdvyaJNrQ0GbvlCVErGaok2S-Suatids";
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      };
      const response = await axios.post("http://localhost:3000/api/message/new", newMessage, config);
      const data = response.data;
      setMessages([...messages, data])
      socket.emit("message", data);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }

  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    }
  }, []);


  const receiveMessage = (message) => {
    const { data } = message;
    console.log("Mensahe recibido: ", data);
    setMessages((state) => [...state, data])
  }

  return (
    <div>
      <Navbar />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>

      <ul>
        {messages.map((message, i) => (
          <li key={i}>
            {/* {message["sender"].userName}: */}
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
