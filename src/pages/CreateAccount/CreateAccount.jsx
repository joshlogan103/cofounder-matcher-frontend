// Import functions and styles

import './CreateAccount.css'
import { useState } from 'react'
import { signup } from '../../services/apiServices.js'
import { useNavigate } from 'react-router'

// Import Radix components

import { Flex, Box, Text, TextField, Button, Container } from '@radix-ui/themes'

// Create Account Page

const CreateAccount = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({email: email, password: password})
  
    try {
      const apiResponse = await signup({ email: email, password: password })
      if (apiResponse.status != 200) {
        throw Error(apiResponse.error)
      }
      navigate('/login')
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