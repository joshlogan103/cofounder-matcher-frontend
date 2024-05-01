import React from 'react'
import { createProfile } from '../../services/apiServices.js'
import { useState } from 'react'
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
    currentSchool: '663135ef4475f6285743d7af',
    aboutMe: '',
    email: '',
    schedulingUrl: '',
    profilePicture: null, // This will hold the file
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) {
      setProfileData({
        ...profileData,
        [keys[0]]: {
          ...profileData[keys[0]],
          [keys[1]]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
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
      navigate('/profile-created'); // Adjust this route based on your app's routing
    } catch (error) {
      console.error(error);
    }
  };

  // const [profileData, setProfileData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   birthDate: '',
  //   currentSchool: '',
  //   aboutMe: '',
  //   linkedinUrl: '',
  //   twitterUrl: '',
  //   instagramUrl: '',
  //   email: '',
  //   schedulingURL: '',
  //   profilePicture: '',
  //   country:'',
  //   state:'',
  //   city:''
  // })
  // const navigate = useNavigate()

  // const handleChange = (e) => {
  //   setProfileData({ ...profileData, [e.target.name]: e.target.value });
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(profileData);
  //   try {
  //     const apiResponse = await createProfile(profileData);
  //     if (apiResponse.status !== 200) {
  //       throw new Error(apiResponse.error);
  //     }
  //     navigate('/create-profile1');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
    <Flex direction="column" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // This ensures that the Flex container takes up the full viewport height
        width: '100%', // This ensures the Flex container takes up the full viewport width
        textAlign: 'center' // This centers the text within the container
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
