import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getConversationById } from '../../services/apiServices'
import MessageBox from '../../components/MessageBox/MessageBox'
import './ActiveConversation.css'

const ActiveConversation = () => {
  const [conversation, setConversation] = useState({ messages: [] })
  const { conversationId } = useParams()

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  if (!token) {
    throw new Error("Authentication token not found");
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  useEffect(() => {
    const fetchConversation = async () => {
      const activeConversation = await getConversationById(conversationId)
      if (activeConversation) {
        setConversation(activeConversation.data)
        console.log(conversation)
      }
    }
    fetchConversation()
  }, [])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
        {conversation.messages && conversation.messages.map(message => (
          message.senderId === userId ?
            <div key={message._id} className='sent'>
              <MessageBox message={message} status={'sent'}/>
            </div>
            :
            <div key={message._id} className='received'>
              <MessageBox message={message} status={'received'}/>
            </div>

        ))}
      </div>
    </>

  )
}

export default ActiveConversation