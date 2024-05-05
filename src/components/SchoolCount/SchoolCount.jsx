import { Text, Box, Heading, Card, Flex } from '@radix-ui/themes'
import { useState, useEffect } from 'react'
import { getSchoolById } from '../../services/apiServices'

const SchoolCount = () => {
  const [ schoolCounts, setSchoolCounts ] = useState({
    Harvard: 0,
    Stanford: 0
  })

  const schoolsArray = [{id: '663135ef4475f6285743d7ae', name: 'Harvard'}, {id: '663135ef4475f6285743d7af', name: 'Stanford'}]

  useEffect(() => {
    const getSchoolCounts = async () => {
      let newCounts = {}
      for (let school of schoolsArray) {
        const schoolObj = await getSchoolById(school.id)
        console.log(schoolObj)
        newCounts[school.name] = schoolObj.data.numberOfProfiles
      }
      setSchoolCounts(newCounts)
    }
    getSchoolCounts()
  },[])


  return (
    <>
      {console.log(schoolsArray)}
      <Flex direction='row' wrap='wrap' gap='4'>
        {schoolsArray.map((school,index) => (
          <Card key={index} 
            style={{
              flex: '0 0 calc(50% - 10px)',
              justifyContent: 'center',
              padding: '20px',
              width: '100%',
              textAlign: 'center',
              minWidth: '150px',
              marginBottom: '30px'}}>
            <Heading>{schoolCounts[school.name]}</Heading>
            <Text>{school.name}</Text>
          </Card> 
      ))}
      </Flex>
    </>
  )
}

export default SchoolCount