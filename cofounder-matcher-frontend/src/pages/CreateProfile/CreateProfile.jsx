import React from 'react'
import { createProfile, getSchools } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Avatar, Heading, Text, TextField, DropdownMenu, ScrollArea, Progress, Box } from '@radix-ui/themes'

const CreateProfile = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;
  console.log(userId)


  const [profileData, setProfileData] = useState({
    userId: userId,
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    email: '',
    schedulingUrl: '',
    profilePicture: null,
    location: {
      country: '',
      state: '',
      city: ''
    },
    socialMedia: {
      linkedinUrl: '',
      twitterUrl: '',
      instagramUrl: ''
    }
  });

  console.log(profileData)

  const [schools, setSchools] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSchools();
        console.log("Fetched schools data:", response); // Debug: Check the structure of the returned data
        if (response && Array.isArray(response.data)) { // Ensure there's a 'data' property and it's an array
          setSchools(response.data);
        } else {
          console.error('Expected response.data to be an array, got:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    let updatedValue = { ...profileData };

    if (keys.length > 1) {
        // Handle nested data
        let temp = updatedValue[keys[0]] || {};
        for (let i = 1; i < keys.length - 1; i++) {
            temp[keys[i]] = { ...temp[keys[i]] };
            temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        updatedValue[keys[0]] = { ...updatedValue[keys[0]], ...temp };
    } else {
        updatedValue[name] = value;
    }
    setProfileData(updatedValue);
  };

  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      profilePicture: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      if (key === 'location' || key === 'socialMedia') {
        Object.keys(profileData[key]).forEach(subKey => {
          formData.append(`${key}.${subKey}`, profileData[key][subKey]);
        });
      } else {
        formData.append(key, profileData[key]);
      }
    });
    if (profileData.profilePicture) {
      formData.append('profilePicture', profileData.profilePicture);
    }

  
      let object = {};
      formData.forEach((value, key) => {
      object[key] = value;
      });
      const json = JSON.stringify(object)
      console.log(json)

    try {
      const apiResponse = await createProfile(json);
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.error);
      }
      navigate('/create-profile1'); // Adjust this route based on your app's routing
    } catch (error) {
      console.error(error);
    }
  };

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
      <Box>
      <Heading>Create Profile</Heading>
      <Box maxWidth="300px">
        <Progress value={33}/>
      </Box>
      <br/>
      <Text size="5">Basic Information</Text>
      <input type="file"  accept="image/*" />
      <br/>
      <Text>Add a profile picture</Text>
      </Box>
      
      <form onSubmit={handleSubmit}>
        
        <br/>
        {/* First Name */}
        <label htmlFor="firstName">First name:</label>
        <br/>
        <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange}
        />
        <br/>

        {/* Last Name */}
        <label htmlFor="lastName">Last name:</label>
        <br/>
        <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange}/>
        <br/>

        {/* Date of Birth */}
        <label htmlFor="birthdate">Birthdate:</label>
        <br/>
        <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange}/>
        <br/>

        {/* School */}
        <label htmlFor="currentSchool">School:</label>
        <br/>
        <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
        <option value="">Select School</option>
        {schools.map(school => (
              <option key={school.id} value={school.id}>{school.name}</option>
            ))}
        </select>
        <br/>


        {/* About Me */}
        <label htmlFor="aboutMe">About me:</label>
        <br/>
        <input type="text" id="aboutMe" name="aboutMe" value={profileData.about} onChange={handleChange}/>
        <br/>

        {/* Linkedin */}
        <label htmlFor="linkedInURL">LinkedIn URL:</label>
        <br/>
        <input type="string" id="linkedinUrl" name="linkedinUrl" value={profileData.linkedInURL} onChange={handleChange}/>
        <br/>

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <br/>
        <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange}/>
        <br/>

        {/* Scheduling URL */}
        <label htmlFor="schedulingUrl">Scheduling Link:</label>
        <br/>
        <input type="string" id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingURL} onChange={handleChange}/>
        <br/>

        {/*Submit Button*/}
        <Button type="submit">Save and Continue</Button>
        <br/>

      </form>
      </Flex>
    </>
  )
}

export default CreateProfile
