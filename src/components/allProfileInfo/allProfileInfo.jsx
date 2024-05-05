import { useEffect, useState } from 'react';
import { Text, Card, Box, Heading } from '@radix-ui/themes';
import { getSchoolById } from '../../services/apiServices';


const AllProfileInfo = ({ profile }) => {
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

  return (
    <>
      {profile && (
        <>
          {/* Basic Information */}
        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '100%', paddingTop: 20, paddingBottom: 10 }}>
            <Heading size="4">Basic Information</Heading>
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


        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '100%', paddingTop: 20, paddingBottom: 10 }}>
            <Heading size="4">Education and Experience</Heading>
            <br/>
            <Box>
              <strong>Current School</strong>
              <Text display="block" size="2" color="gray" style={{ display: 'block' }}>{schoolName || 'Not provided'}</Text>
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

        <Card style={{ justifyContent: 'center', textAlign: 'center', width: '100%', paddingTop: 20, paddingBottom: 10, marginBottom: 45 }}>
        <Heading size="4">Interests and Ideas</Heading>
            <br/>
        <Box>
          <strong>Who I&apos;m Interested in Connecting With</strong>
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
        </>
      )}
    </>
  );
}

export default AllProfileInfo;
