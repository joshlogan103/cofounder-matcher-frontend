import { Text, Box, Heading } from '@radix-ui/themes'
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
      {schoolsArray.map((school,index) => (
        <Box key={index}>
          <Heading>{schoolCounts[school.name]}</Heading>
          <Text>{school.name}</Text>
        </Box>  
      ))}
    </>
  )
}

export default SchoolCount