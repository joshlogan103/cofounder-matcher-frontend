import React from 'react'
import { updateProfileByUserId, getProgramTypes } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Heading, Text, Progress, Box, TextField } from '@radix-ui/themes'

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
        width: '100%',
        textAlign: 'center'
      }}>
      <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'rgba(17,17,17)', width: '100%',paddingTop: 50, paddingBottom: 0 }}>
        <>
          <Heading >Create Profile</Heading>
          <br/>
          <Text size="5">Education and Experience  </Text>
          <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <br/>
          <br/>
          <Box maxWidth="300px">
            <Progress value={66}/>
          </Box>
          <br/>
        </>
      </Box>
      
      
      <form onSubmit={handleSubmit} style={{ marginTop: '160px' }}>
        
        <br/>
        {/* ProgramType */}
        <Text htmlFor="programType">What type of program are you currently in?</Text>
        <br/>
        <select id="programType" name="programType" value={profileData.programType} onChange={handleChange}>
          <option value="">Select Program Type</option>
          {programTypes.map(programType => (
            <option key={programType} value={programType}>{programType}</option>
          ))}
        </select>
        <br/>
        <br/>

        {/* Previous Education */}
        <Text htmlFor="previousEducation">Education History:</Text>
        <br/>
        <TextField.Root id="previousEducation" name="previousEducation" value={profileData.previousEducation} onChange={handleChange} placeholder="Previous Education">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Employment History */}
        <Text htmlFor="employmentHistory">Employment History:</Text>
        <br/>
        <TextField.Root id="employmentHistory" name="employmentHistory" value={profileData.employmentHistory} onChange={handleChange} placeholder="Employment History">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Technical */}
        <Text htmlFor="technical">Are you technical?</Text>
        <br/>
        <select id="technical" name="technical" value={profileData.technical} onChange={handleChange}>
        <option value="true">Yes</option>
        <option value="false">No</option>
        </select>
        <br/>
        <br/>

        {/* Impressive Acomplishment */}
        <Text htmlFor="impressiveAccomplishmnet">Brag About an Impressive Accomplishment:</Text>
        <br/>
        <TextField.Root id="impressiveAccomplishmnet" name="impressiveAccomplishmnet" value={profileData.impressiveAccomplishmnet} onChange={handleChange} placeholder="Impressive Accomplishment">
          <TextField.Slot/>
        </TextField.Root>
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
