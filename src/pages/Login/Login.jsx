import './Login.css'
import { useState } from 'react'
import { login } from '../../services/apiServices.js'
import { useNavigate } from 'react-router'
import { setToken } from '../../services/tokenServices.js'

// Import Radix components

import { Flex, Box, Text, TextField, Button, Container } from '@radix-ui/themes'

// Create Account Page

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({email: email, password: password})
  
    try {
      const apiResponse = await login({ email: email, password: password })
      if (apiResponse.status != 200) {
        throw Error(apiResponse.error)
      }
      setToken(apiResponse.data.accessToken)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Flex>
        <Box>
          <Flex direction={'column'} gap={'2'} align={'center'} justify={'center'} width={'100vw'}>
            <Container pt={'7'} align={'center'}>
              <Text size={'7'}>Log in</Text>
            </Container>
            <form onSubmit={handleSubmit}>
              <Flex direction={'column'} gap={'3'} pt={'5'}>
                  <Text>Email</Text>
                  <TextField.Root 
                    type='text'
                    value={email}
                    onChange={e => { setEmail(e.target.value) }}
                  />
                  <Text>Password</Text>
                  <TextField.Root 
                    type='password'
                    value={password}
                    onChange={e => { setPassword(e.target.value) }}
                  />
                  <Button mt={'5'} type={'submit'}>Submit</Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default Login