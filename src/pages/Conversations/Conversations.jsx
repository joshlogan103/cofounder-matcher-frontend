import { useEffect, useState } from "react"
import { getConversationsByUserId } from "../../services/apiServices"
import ChatPreview from "../../components/ChatPreview/ChatPreview"

const Conversations = () => {
  const [conversationsArray, setConversationsArray] = useState([])

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
        <ChatPreview key={conversation._id} conversation={conversation} />
      ))}
    </div>
    </>
  )
}

export default Conversations