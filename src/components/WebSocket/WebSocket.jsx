import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./WebSocket.css"

const socket = 'null' //io('http://localhost:3000');

const WebSocket = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // userId: Uniquely identifies the user in the room
  const [userId, setUserId] = useState('');

  // Here, i listen when the user connects to the chat and then  got assign an unique user ID.
  useEffect(() => {
    socket.on('connect', () => {
      setUserId(socket.id);
    });

    // everytime we get a new msj from the server then we add it to the message list
    socket.on("receive-message", message => {
      // prevMessages: It is the current state of messages
      setMessages(prevMessages => [...prevMessages, message]);
    });


    // connection is being close here 
    return () => {
      socket.off("receive-message");
      socket.off("connect");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const newMessage = { text: message, user: userId };
      socket.emit('message', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="app-container">
      <div className="chat-header">Chat</div>
      <ul className="messages-list">
        {messages.map((msg, index) => (
          <li key={index} className={`message-item ${msg.user === userId ? 'my-message' : 'other-message'}`}>
            {msg.text}
            <div className="message-timestamp">{msg.timestamp}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="send-message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here..."
          className="send-message-input"
        />
        <button type="submit" className="send-message-button">Send</button>
      </form>
    </div>
  );
}

export default WebSocket