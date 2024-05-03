import React from 'react'
import { updateProfileByUserId, getProgramTypes } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Heading, Text, Progress, Box } from '@radix-ui/themes'

const CreateProfile1 = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const [profileData, setProfileData] = useState({
    previousEducation: '',
    programType: '',
    employmentHistory: '',
    technical: '',
    impressiveAccomplishmnet: '',
  })

  const [programTypes, setProgramTypes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgramTypes();
        console.log("Fetched programtypes data:", response); 
        if (response && Array.isArray(response.data)) { // Ensure there's a 'data' property and it's an array
          setProgramTypes(response.data);
        } else {
          console.error('Expected response.data to be an array, got:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch programtypes:', error);
      }
    };
  
    fetchData();
  }, []);

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
      const apiResponse = await updateProfileByUserId(userId, profileData);
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
        {/* ProgramType */}
        <label htmlFor="programType">What type of program are you currently in?</label>
        <br/>
        <select id="programType" name="programType" value={profileData.programType} onChange={handleChange}>
          <option value="">Select Program Type</option>
          {programTypes.map(programType => (
            <option key={programType} value={programType}>{programType}</option>
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
        <option value="true">Yes</option>
        <option value="false">No</option>
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
