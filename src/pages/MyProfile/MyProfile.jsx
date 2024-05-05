import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileByUserId, getSchoolById } from '../../services/apiServices';
import { Box, Button, Heading, Card, Flex, Text } from '@radix-ui/themes'
import './MyProfile.css'

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Path to your edit profile page
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
        if (!token) {
          throw new Error("Authentication token not found");
        }
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;
        console.log(userId);

        const apiResponse = await getProfileByUserId(userId);
        if (apiResponse.status !== 200) {
          throw new Error(`Failed to fetch: ${apiResponse.statusText || 'Unknown error'}`);
        }
        setProfile(apiResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [schoolName, setSchoolName] = useState('')

  useEffect(() => {
    const fetchSchoolName = async () => {
      if (profile && profile.currentSchool) {
        try {
          const response = await getSchoolById(profile.currentSchool);
          console.log("School name response:", response);
          setSchoolName(response.data.name);
          console.log("School name:", schoolName);
        } catch (error) {
          console.error("Failed to fetch school name:", error);
          setSchoolName('Unknown School');
        }
      }
    };

    fetchSchoolName();
  }, [profile]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(profile);
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
            <Heading>Profile Details</Heading>
            <br/>
          </>
        </Box>
        
      {/* Basic Information */}
        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '90%', paddingTop: 20, paddingBottom: 10, marginTop: 50 }}>
            <Heading size="4">Basic Information</Heading>
            <br/>
            <Box>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.profilePicture ? <img src={profile.profilePicture} alt="Profile" style={{ width: 100, height: 100, borderRadius: 50 }} /> : 'No image'}</Text>
            </Box>
            <br/>
            <Box>
              <strong>Name</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.fullName || `${profile.firstName} ${profile.lastName}`}</Text>
            </Box>
            <Box>
              <strong>Birth Date</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : 'Not provided'}</Text>
            </Box>
            <Box>
              <strong>Email</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.email}</Text>
            </Box>
            <Box>
              <strong>About Me</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.aboutMe || 'Not provided'}</Text>
            </Box>
            <Box>
              <strong>LinkedIn URL</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">View LinkedIn</a> : 'No LinkedIn profile'}</Text>
            </Box>
            <Box>
              <strong>Scheduling URL</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.schedulingUrl ? <a href={profile.schedulingUrl} target="_blank" rel="noopener noreferrer">Schedule a meeting</a> : 'Not available'}</Text>
            </Box>
        </Card>


        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '90%', paddingTop: 20, paddingBottom: 10, marginTop: 20 }}>
            <Heading size="4">Education and Experience</Heading>
            <br/>
            <Box>
              <strong>Current School</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{schoolName|| 'Not provided'}</Text>
            </Box>
            <Box>
              <strong>Current Program Type</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.programType || 'Not specified'}</Text>
            </Box>
            <Box>
              <strong>Technical</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.technical ? 'Yes' : 'No'}</Text>
            </Box>
            <Box>
              <strong>Previous Education</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.previousEducation || 'Not specified'}</Text>
            </Box>
            <Box>
              <strong>Employment History</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.employmentHistory || 'Not provided'}</Text>
            </Box>
            <Box>
              <strong>Impressive Accomplishment</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.impressiveAccomplishment || 'Not provided'}</Text>
            </Box>
        </Card>

        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '90%', paddingTop: 20, paddingBottom: 10, marginTop: 20, marginBottom: 20 }}>
        <Heading size="4">Interests and Ideas</Heading>
            <br/>
        <Box>
          <strong>Who I'm Interested in Connecting With</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.connectionInterest || 'Not specified'}</Text>
        </Box>
        <Box>
          <strong>Industry Interests</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.industryInterests?.join(', ') || 'None'}</Text>
        </Box>
        <Box>
          <strong>Interested in Being a Cofounder</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.interestedInBeingACofounder ? 'Yes' : 'No'}</Text>
        </Box>
        <Box>
          <strong>Business Idea</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.hasIdea || 'Not specified'}</Text>
        </Box>
        <Box>
          <strong>Potential Ideas</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.potentialIdeas?.join(', ') || 'None'}</Text>
        </Box>
        <Box>
          <strong>Areas of Responsibility</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.areasOfResponsibility?.join(', ') || 'Not specified'}</Text>
        </Box>
        <Box>
          <strong>Cofounder Desired Qualities</strong>
          <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{profile.cofounderDesiredQualities?.join(', ') || 'None'}</Text>
        </Box>
        </Card>

        <Button onClick={handleEditProfile}>Edit Profile</Button>
    </Flex>
  </>
  );
};

export default MyProfile;
