import { useEffect, useState } from "react"
import { getConversationsByUserId } from "../../services/apiServices"
import ChatPreview from "../../components/ChatPreview/ChatPreview"
import { Text } from '@radix-ui/themes'

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
    {conversationsArray.length > 0 ? 
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px'}}>
    { conversationsArray.map(conversation => (
        <ChatPreview key={conversation._id} conversation={conversation} />
      ))}
    </div> :
    <div style={{ textAlign: 'center', marginTop: '40px'}}>
    <Text>You don&apos;t have any active conversations. You can start a conversation by messaging someone from the Search Profiles page.</Text>
    </div>
}
    </>
  )
}

export default Conversations