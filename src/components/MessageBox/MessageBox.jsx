import { Box, Card, Flex, Avatar, Text } from '@radix-ui/themes'
import { useState, useEffect } from 'react'
import { getProfileByUserId } from '../../services/apiServices'

const MessageBox = ({ message, status }) => {
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const fetchSender = async () => {
      const senderProfile = await getProfileByUserId(message.senderId)
      if (senderProfile.data) {
        setProfile(senderProfile.data)
      } else {
        console.log('Sender profile not found')
      }
    }
    fetchSender()
  }, [])

  return (
    <>
      <Box style={{ marginBottom: '20px', width: '60vw', maxWidth: '800px' }}>
        <Card>
          <Flex align="center" justify="flex-start" style={{
            flexDirection: status === 'received' ? 'row' : 'row-reverse'
          }}>
              <Avatar
                size="3"
                src={profile.profilePicture}
                alt={profile && profile.profilePicture}
                radius="full"
                fallback=""
                style={{
                  marginRight: status === 'received' ? '10px' : '',
                  marginLeft: status === 'sent' ? '10px' : ''
                }}
              />
              <Box>
                <Text key={profile._id} as="div" size="2" weight="bold" style={{ textAlign: status === 'sent' ? 'right' : 'left'}}>{profile.fullName ? profile.fullName : `${profile.firstName} ${profile.lastName}`}</Text>
                <Text as="div" size="2" color="gray">
                  {message.content}
                </Text>
              </Box>
          </Flex>
        </Card>
      </Box>
    </>
  )
}

export default MessageBox