import React from 'react'
import { createProfile, getSchools } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { uploadImage } from '../../utils/firebaseUtils.js'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Heading, Text, Progress, Box, TextField } from '@radix-ui/themes'

const CreateProfile = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;
  
  const [profileData, setProfileData] = useState({
    userId: userId,
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    linkedinUrl: '',
    email: '',
    schedulingUrl: '',
    profilePicture: ''
  })

  const [schools, setSchools] = useState([])
  const [imageUpload, setImageUpload] = useState(null)
  const navigate = useNavigate()

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
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);  // store the file object
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // If a new image file is uploaded, upload it to Firebase and get the new URL
    if (imageUpload) {
      try {
        console.log('File to upload:', imageUpload)
        const imageUrl = await uploadImage(imageUpload);
        console.log('Uploaded image URL:', imageUrl);
        // Directly use imageUrl in formData since state updates may not complete in time
        const formData = createFormData({...profileData, profilePicture: imageUrl});
        submitProfile(formData);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      // No new image to upload, proceed with existing data
      const formData = createFormData(profileData);
      submitProfile(formData);
    }
  };
  
  function createFormData(data) {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    console.log('Form data:', formData);
    return formData;
  }
  
  async function submitProfile(formData) {
    try {
      const apiResponse = await createProfile(formData);
      if (apiResponse.status === 200) {
        navigate('/create-profile1');
      } else {
        throw new Error('Failed to create profile: ' + apiResponse.statusText);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
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
      <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'black', width: '100%',paddingTop: 50, paddingBottom: 0 }}>
        <>
          <Heading >Create Profile</Heading>
          <br/>
          <Text size="5" >Basic Information </Text>
          <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <br/>
          <br/>
          <Box maxWidth="300px">
            <Progress value={33}/>
          </Box>
          <br/>
        </>
      </Box>
      
      
      <form onSubmit={handleSubmit} style={{ marginTop: '180px' }}>
        
        {/* Profile Picture */}
        <Text>Add a profile picture</Text>
          <input type="file" id="profilePicture" accept="image/*" onChange={handleFileChange} />
          <br/>
        
        <br/>
        {/* First Name */}
        <Text htmlFor="firstName">First name</Text>
        <br/>
        <TextField.Root id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="First Name">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Last Name */}
        <Text htmlFor="lastName">Last name</Text>
        <br/>
        <TextField.Root id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Last Name">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Date of Birth */}
        <Text htmlFor="birthdate">Birthdate</Text>
        <br/>
        <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange}/>
        <br/>
        <br/>

        {/* School */}
        <Text htmlFor="currentSchool">Current school</Text>
        <br/>
        <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
        <option value="">Select School</option>
        {schools.map(school => (
              <option key={school._id} value={school._id}>{school.name}</option>
            ))}
        </select>
        <br/>
        <br/>


        {/* About Me */}
        <Text htmlFor="aboutMe">About me</Text>
        <br/>
        <TextField.Root id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} placeholder="Tell us about your background, interests, career, and what you're looking for on this app">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Linkedin */}
        <Text htmlFor="linkedinUrl">LinkedIn URL</Text>
        <br/>
        <TextField.Root id="linkedinUrl" name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleChange} placeholder="Linkedin URL">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Email */}
        <Text htmlFor="email">Email</Text>
        <br/>
        <TextField.Root id="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Scheduling URL */}
        <Text htmlFor="schedulingUrl">Scheduling URL</Text>
        <br/>
        <TextField.Root id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingUrl} onChange={handleChange} placeholder="Scheduling URL">
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

export default CreateProfile

//PRE-FIREBASE IMPLEMENTATION

// import React from 'react'
// import { createProfile, getSchools } from '../../services/apiServices.js'
// import { useState, useEffect } from 'react'
// import { uploadImage } from '../../utils/firebaseUtils.js'
// import { useNavigate } from 'react-router'
// import './CreateProfile.css'

// import { Flex, Button, Heading, Text, Progress, Box, TextField } from '@radix-ui/themes'

// const CreateProfile = () => {

//   const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
//   const payload = JSON.parse(atob(token.split('.')[1]));
//   const userId = payload.userId;
  
//   const [profileData, setProfileData] = useState({
//     userId: userId,
//     firstName: '',
//     lastName: '',
//     birthDate: '',
//     currentSchool: '',
//     aboutMe: '',
//     linkedinUrl: '',
//     email: '',
//     schedulingUrl: '',
//     profilePicture: ''
//   })

//   const [schools, setSchools] = useState([])
//   const [imageUpload, setImageUpload] = useState(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getSchools();
//         console.log("Fetched schools data:", response); // Debug: Check the structure of the returned data
//         if (response && Array.isArray(response.data)) { // Ensure there's a 'data' property and it's an array
//           setSchools(response.data);
//         } else {
//           console.error('Expected response.data to be an array, got:', response.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch schools:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value })
//   }

//   const handleFileChange = (e) => {
//     setImageUpload(e.target.files[0]);  // store the file object
//   }
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(profileData);

//     const formData = new FormData();
//     Object.keys(profileData).forEach(key => {
//         formData.append(key, profileData[key]);
//       });
//     if (profileData.profilePicture) {
//       formData.append('profilePicture', profileData.profilePicture);
//     }

//     try {
//       const apiResponse = await createProfile(profileData);
//       if (apiResponse.status !== 200) {
//         throw new Error(apiResponse.error);
//       }
//       navigate('/create-profile1');
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <>
//     <Flex direction="column" 
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         textAlign: 'center'
//       }}>
//       <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'rgba(17,17,17)', width: '100%',paddingTop: 50, paddingBottom: 0 }}>
//         <>
//           <Heading >Create Profile</Heading>
//           <br/>
//           <Text size="5" >Basic Information </Text>
//           <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
//           <br/>
//           <br/>
//           <Box maxWidth="300px">
//             <Progress value={33}/>
//           </Box>
//           <br/>
//         </>
//       </Box>
      
      
//       <form onSubmit={handleSubmit} style={{ marginTop: '180px' }}>
        
//         {/* Profile Picture */}
//         <Text>Add a profile picture</Text>
//           <input type="file"  accept="image/*" />
//           <br/>
        
//         <br/>
//         {/* First Name */}
//         <Text htmlFor="firstName">First name</Text>
//         <br/>
//         <TextField.Root id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="First Name">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/* Last Name */}
//         <Text htmlFor="lastName">Last name</Text>
//         <br/>
//         <TextField.Root id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Last Name">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/* Date of Birth */}
//         <Text htmlFor="birthdate">Birthdate</Text>
//         <br/>
//         <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange}/>
//         <br/>
//         <br/>

//         {/* School */}
//         <Text htmlFor="currentSchool">Current school</Text>
//         <br/>
//         <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
//         <option value="">Select School</option>
//         {schools.map(school => (
//               <option key={school._id} value={school._id}>{school.name}</option>
//             ))}
//         </select>
//         <br/>
//         <br/>


//         {/* About Me */}
//         <Text htmlFor="aboutMe">About me</Text>
//         <br/>
//         <TextField.Root id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} placeholder="Tell us about your background, interests, career, and what you're looking for on this app">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/* Linkedin */}
//         <Text htmlFor="linkedinUrl">LinkedIn URL</Text>
//         <br/>
//         <TextField.Root id="linkedinUrl" name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleChange} placeholder="Linkedin URL">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/* Email */}
//         <Text htmlFor="email">Email</Text>
//         <br/>
//         <TextField.Root id="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/* Scheduling URL */}
//         <Text htmlFor="schedulingUrl">Scheduling URL</Text>
//         <br/>
//         <TextField.Root id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingUrl} onChange={handleChange} placeholder="Scheduling URL">
//           <TextField.Slot/>
//         </TextField.Root>
//         <br/>

//         {/*Submit Button*/}
//         <Button type="submit">Save and Continue</Button>
//         <br/>

//       </form>
//       </Flex>
//     </>
//   )
// }

// export default CreateProfile