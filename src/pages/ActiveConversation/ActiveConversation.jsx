import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getConversationById, getProfileByUserId, createMessageAndUpdateConversation } from '../../services/apiServices'
import MessageBox from '../../components/MessageBox/MessageBox'
import './ActiveConversation.css'
import { Button, Text, TextField } from '@radix-ui/themes'

const ActiveConversation = () => {
  const [conversation, setConversation] = useState({ messages: [] })
  const [interlocutor, setInterlocutor] = useState({})
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const { conversationId } = useParams()

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  if (!token) {
    throw new Error("Authentication token not found");
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSend = () => {
    createMessageAndUpdateConversation(conversationId, { content: text, receiverId: interlocutor._id, timeSent: new Date() })
    setText('')
  }

  useEffect(() => {
    const fetchConversation = async () => {
      const activeConversation = await getConversationById(conversationId)
      if (activeConversation) {
        setConversation(activeConversation.data)
        const fetchInterlocutor = async () => {
          const otherUser = activeConversation.data.users.find(user => {
            return user !== userId
          })
          const otherProfile = await getProfileByUserId(otherUser)
          if (otherUser) {
            setInterlocutor(otherProfile.data)
            setLoading(false)
          }
        }
        fetchInterlocutor()
      }
    }
    fetchConversation()

    const fetchInterval = setInterval(fetchConversation,3000)

    return () => clearInterval(fetchInterval)

  }, [conversationId])

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Text style={{ marginTop: '30px' }}>{loading ? '...' : `${interlocutor.firstName} ${interlocutor.lastName}`}</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px', marginBottom: '60px'}}>
        {conversation.messages && conversation.messages.map(message => (
          message.senderId === userId ?
            <div key={message._id} className='sent'>
              <MessageBox message={message} status={'sent'} />
            </div>
            :
            <div key={message._id} className='received'>
              <MessageBox message={message} status={'received'} />
            </div>

        ))}
      </div>
      <br/>
      <div className='typing-winow' style={{ display: 'flex', position: 'fixed', bottom: 10, width: '100vw', justifyContent: 'center', marginTop: '100px'}}>
        <TextField.Root id="text" name="text" value={text} onChange={handleChange} placeholder={`Message ${interlocutor.firstName}`} style={{ width: '100vw', maxWidth: '800px', marginRight: '20px', marginLeft: '20px' }}>
          <TextField.Slot />
        </TextField.Root>
        <Button onClick={handleSend} style={{ marginRight: '30px' }}>Send</Button>
      </div>
    </>

  )
}

export default ActiveConversation