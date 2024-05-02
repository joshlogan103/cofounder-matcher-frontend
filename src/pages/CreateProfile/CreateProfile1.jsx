import React from 'react'
import { updateProfileById } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Flex, Button, Heading, Text, Progress, Box } from '@radix-ui/themes'

const CreateProfile1 = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;
  console.log(userId)

  const [profileData, setProfileData] = useState({
    previousEducation: '',
    programType: '',
    employmentHistory: '',
    technical: '',
    impressiveAccomplishmnet: '',
  })

  // const [schools, setSchools] = useState([])
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getSchools();
  //       console.log("Fetched schools data:", response); // Debug: Check the structure of the returned data
  //       if (response && Array.isArray(response.data)) { // Ensure there's a 'data' property and it's an array
  //         setSchools(response.data);
  //       } else {
  //         console.error('Expected response.data to be an array, got:', response.data);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch schools:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profileData);

    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
        formData.append(key, profileData[key]);
      });
    if (profileData.profilePicture) {
      formData.append('profilePicture', profileData.profilePicture);
    }

    // let object = {};
    // formData.forEach((value, key) => {
    // object[key] = value;
    // });
    // const json = JSON.stringify(object)
    // console.log(json)

    try {
      const apiResponse = await updateProfileById(userId, profileData);
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.error);
      }
      navigate('/create-profile2');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <Flex direction="column" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        width: '100%',
        textAlign: 'center'
      }}>
      <Box display="block" asChild>
        <>
          <Heading >Create Profile</Heading>
          <Box maxWidth="300px">
            <Progress value={66}/>
          </Box>
          <br/>
          <Text size="5">Education and Experience</Text>
          <br/>
        </>
      </Box>
      
      
      <form onSubmit={handleSubmit}>
        
        <br/>
        {/* ProgramType TODO: Add ProgramType helper functions */}
        <label htmlFor="programType">School:</label>
        <br/>
        <select id="programType" name="programType" value={profileData.programType} onChange={handleChange}>
        <option value="">Select Program Type</option>
        {programs.map(program => (
              <option key={program.name} value={program.name}>{program.name}</option>
            ))}
        </select>
        <br/>

        {/* Previous Education */}
        <label htmlFor="previousEducation">Education History:</label>
        <br/>
        <input type="text" id="previousEducation" name="previousEducation" value={profileData.previousEducation} onChange={handleChange}/>
        <br/>

        {/* Employment History */}
        <label htmlFor="employmentHistory">Employment History:</label>
        <br/>
        <input type="text" id="employmentHistory" name="employmentHistory" value={profileData.employmentHistory} onChange={handleChange}/>
        <br/>

        {/* Technical */}
        <label htmlFor="technical">Are you technical?</label>
        <br/>
        <select id="technical" name="technical" value={profileData.technical} onChange={handleChange}>
        <option value="">Yes</option>
        <option value="">No</option>
        </select>
        <br/>

        {/* Impressive Acomplishment */}
        <label htmlFor="impressiveAccomplishmnet">Brag About an Impressive Accomplishment:</label>
        <br/>
        <input type="text" id="impressiveAccomplishmnet" name="impressiveAccomplishmnet" value={profileData.impressiveAccomplishmnet} onChange={handleChange}/>
        <br/>

        {/*Submit Button*/}
        <Button type="submit">Save and Continue</Button>
        <br/>

      </form>
      </Flex>
    </>
  )
}

export default CreateProfile1
