import { useParams } from 'react-router-dom'
import WebSocket from '../../components/WebSocket/WebSocket'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { userId } from '../../helpers'


const ActiveConversation = () => {
  const [messages, setMessages] = useState([])
  const [receiverId, setReceiverId] = useState("")
  const { conversationId } = useParams()

  const fetchConversationsMessages = async () => {
    const convs = await axios.get(`http://localhost:3001/conversations/${conversationId}`)
    console.log(convs.data, "convs");

    setReceiverId(convs.data?.users[0] === userId ? convs.data?.users[1] : convs.data?.users[0])
    setMessages(convs.data?.messages || [])
  }

  useEffect(() => {
    fetchConversationsMessages()
  }, [])

  return (
    <div>{conversationId}
      <WebSocket receiverId={receiverId} setMessages={setMessages} messages={messages} />
    </div>
  )
}

export default ActiveConversation