import { Flex, Button, Box, Card, Text, Avatar } from '@radix-ui/themes'
import { useState, useEffect } from 'react'
import { getProfileByUserId } from '../../services/apiServices'

const ChatWindow = ({ conversation, handleChat }) => {
  const [profile, setProfile] = useState('')

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  if (!token) {
    throw new Error("Authentication token not found");
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const lastMessageIdx = conversation.messages.length - 1
  const lastMessage = conversation.messages[lastMessageIdx]

  const interlocutor = conversation.users.find(user => {
    return user._id !== userId
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfileByUserId(interlocutor._id)
      if (profile.data) {
        setProfile(profile.data)
      } else {
        console.log('No profile found')
      }
    }
    fetchProfile()
  }, [])

  return (
    <>
      <Box style={{ marginBottom: '20px', width: '90vw', maxWidth: '800px' }}>
        <Card>
          <Flex align="center" justify="space-between">
            <Flex gap="3" align="center" style={{ flex: 1 }}>
            <Avatar
              size="3"
              src={profile.profilePicture}
              alt={profile && profile.profilePicture}
              radius="full"
              fallback=""
            />
              <Box>
                <Text key={interlocutor._id} as="div" size="2" weight="bold">{profile.fullName ? profile.fullName : `${profile.firstName} ${profile.lastName}`}</Text>
                <Text as="div" size="2" color="gray">
                  {lastMessage.content}
                </Text>
              </Box>
            </Flex>
            <Button onClick={handleChat}>Chat</Button>
          </Flex>
        </Card>
      </Box>
    </>
  )
}

export default ChatWindow