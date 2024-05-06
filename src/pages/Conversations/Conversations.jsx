import { useEffect, useState } from "react"
import { getConversationsByUserId } from "../../services/apiServices"
import ChatWindow from "../../components/ChatWindow/ChatWindow"

const Conversations = () => {
  const [conversationsArray, setConversationsArray] = useState([])

  const handleChat = () => {

  }

  useEffect(() => {
    const fetchConversationsByUser = async () => {
      const conversations = await getConversationsByUserId()
      console.log(conversations.data)
      if (conversations.data) {
        setConversationsArray(conversations.data)
      } else {
        console.log('No conversations found')
      }
    }
    fetchConversationsByUser()
  }, [])

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
    { conversationsArray.map(conversation => (
        <ChatWindow key={conversation._id} conversation={conversation} handleChat={handleChat} />
      ))}
    </div>
    </>
  )
}

export default Conversations