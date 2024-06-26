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
      <Box style={{ marginBottom: '20px', width: '80vw', maxWidth: '800px' }}>
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
                <Text as="div" size="2" color="white">
                  {message.content}
                </Text>
                <Text as="div" size="1" color="gray" style={{ textAlign: status === 'sent' ? 'right' : ''}}>
                  {message.timeSent.split('T')[1].substring(0,5)}
                </Text>
              </Box>
          </Flex>
        </Card>
      </Box>
    </>
  )
}

export default MessageBox