import './Conversations.css'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const userId = "66315410749735bf567d638b"


const Conversations = () => {
  const [conversations, setConversations] = useState([])


  const getUserById = async (id) => {
    console.log(id);
    const res = await axios.get(`http://localhost:3001/users/${id}`)

    return res
  }

  const fetchAllComversations = async () => {
    try {
      await axios.get(`http://localhost:3001/conversations/users/${userId}`).then(async (res) => {
        const convs = res.data.map(async (conversation) => {
          const user1 = await getUserById(conversation.users[0])
          const user2 = await getUserById(conversation.users[1])


          return {
            ...conversation,
            users: [
              user1.data,
              user2.data
            ]
          }
        })

        const newConvs = await Promise.all(convs)

        setConversations(newConvs)

        console.log(newConvs, "conversations");
      }).catch((error) => {

      })
    } catch (error) {

    }
  }


  useEffect(() => {
    fetchAllComversations()
  }, [])

  return (
    <div className="conversations">
      {conversations.map((conversation, index) => (
        <div onClick={() => window.location.href = `/conversations/${conversation._id}`} className="conversation" key={index}>
          {conversation.users[0].email}
        </div>
      ))
      }
    </div>
  )
}

export default Conversations