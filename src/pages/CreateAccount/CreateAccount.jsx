// Import functions and styles

import './CreateAccount.css'
import { useState, useContext } from 'react'
import { signup, login, verifyLoggedIn } from '../../services/apiServices.js'
import { useNavigate } from 'react-router'
import { setToken } from '../../services/tokenServices.js'
import { AuthContext } from '../../contexts/AuthContext.jsx'

// Import Radix components

import { Flex, Box, Text, TextField, Button, Container } from '@radix-ui/themes'

// Create Account Page

const CreateAccount = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()
  const { setIsUserLoggedIn } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({email: email, password: password})
  
    try {
      const apiResponseSignup = await signup({ email: email, password: password })
      if (apiResponseSignup.status != 200) {
        throw Error(apiResponseSignup.error)
      }
      const apiResponseLogin = await login({ email: email, password: password})
      if (apiResponseLogin.status != 200) {
        throw Error(apiResponseLogin.error)
      }
      setToken(apiResponseLogin.data.accessToken)
      setIsUserLoggedIn(verifyLoggedIn())
      navigate('/create-profile')
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
              <Text size={'7'}>Create an Account</Text>
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

export default CreateAccount