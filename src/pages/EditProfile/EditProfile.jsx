import { updateProfileByUserId, getProgramTypes, getSchools, getAreasOfResponsibility, getHasIdea, getIndustryInterests } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './EditProfile.css'

import { Flex, Button, Heading, Text, Progress, TextField, Box, Select, ScrollArea, CheckboxGroup } from '@radix-ui/themes'

const EditProfile = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    currentSchool: '',
    aboutMe: '',
    linkedinUrl: '',
    email: '',
    schedulingUrl: '',
    profilePicture: '',
    previousEducation: '',
    programType: '',
    employmentHistory: '',
    technical: '',
    impressiveAccomplishmnet: '',
    interestedInBeingACofounder: '',
    connectionInterest: '',
    industryInterests: [],
    areasOfResponsibility: [],
    hasIdea: '',
    potentialIdeas: '',
    cofounderDesiredQualities: ''

  })

  const [hasIdea, setHasIdea] = useState([])
  const [industryInterests, setIndustryInterests] = useState([])
  const [areasOfResponsibility, setAreasOfResponsibility] = useState([])
  const [programTypes, setProgramTypes] = useState([])
  const [schools, setSchools] = useState([])
  const navigate = useNavigate()




  useEffect(() => {
    const fetchData = async () => {
      try {
        // Execute all API calls concurrently
        const [hasIdea, industryInterests, areasOfResponsibility, programTypes, schools] = await Promise.all([
          getHasIdea(),
          getIndustryInterests(),
          getAreasOfResponsibility(),
          getProgramTypes(),
          getSchools()
        ]);


        // Check and set hasIdea
        if (hasIdea && Array.isArray(hasIdea.data)) {
          setHasIdea(hasIdea.data);
        } else {
          console.error('Expected hasIdea.data to be an array, got:', hasIdea.data);
        }

        // Check and set industry interests
        if (industryInterests && Array.isArray(industryInterests.data)) {
          setIndustryInterests(industryInterests.data);
        } else {
          console.error('Expected industryInterests.data to be an array, got:', industryInterests.data);
        }

        // Check and set areas of responsibility
        if (areasOfResponsibility && Array.isArray(areasOfResponsibility.data)) {
          setAreasOfResponsibility(areasOfResponsibility.data);
        } else {
          console.error('Expected areasOfResponsibility.data to be an array, got:', areasOfResponsibility.data);
        }

        // Check and set program types
        if (programTypes && Array.isArray(programTypes.data)) {
          setProgramTypes(programTypes.data);
        } else {
          console.error('Expected programTypes.data to be an array, got:', programTypes.data);
        }

        // Check and set schools
        if (schools && Array.isArray(schools.data)) {
          setSchools(schools.data);
        } else {
          console.error('Expected schools.data to be an array, got:', schools.data);
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [navigate]);

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

    try {
      const apiResponse = await updateProfileByUserId(userId, profileData);
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.error);
      }
      navigate('/my-profile');
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
        <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'rgba(17,17,17)', width: '100%', paddingTop: 50, paddingBottom: 10 }}>
          <>
            <Heading >Edit Profile</Heading>
            <br />
            <Box maxWidth="300px">
              <Progress />
            </Box>
          </>
        </Box>
        <div className='edit-profile-form-container' style={{
          display: 'flex',
          justifyContent: 'center',
          width: '85vw',
          maxWidth: '600px'
        }}>

          <form onSubmit={handleSubmit} style={{ marginTop: '100px'}} className='edit-profile-form'>

            <br />
            {/* First Name */}
            <Text htmlFor="firstName">First name</Text>
            <br />
            <TextField.Root id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} placeholder="First Name">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Last Name */}
            <Text htmlFor="lastName">Last name</Text>
            <br />
            <TextField.Root id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} placeholder="Last Name">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Date of Birth */}
            <Text htmlFor="birthdate">Birthdate</Text>
            <br />
            <input type="date" id="birthDate" name="birthDate" value={profileData.birthDate} onChange={handleChange} />
            <br />
            <br />

            {/* School */}
            <Text htmlFor="currentSchool">Current school</Text>
            <br />
            <select id="currentSchool" name="currentSchool" value={profileData.currentSchool} onChange={handleChange}>
              <option value="">Select School</option>
              {schools.map(school => (
                <option key={school._id} value={school._id}>{school.name}</option>
              ))}
            </select>
            <br />
            <br />


            {/* About Me */}
            <Text htmlFor="aboutMe">About me</Text>
            <br />
            <TextField.Root id="aboutMe" name="aboutMe" value={profileData.aboutMe} onChange={handleChange} placeholder="Tell us about your background, interests, career, and what you're looking for on this app">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Linkedin */}
            <Text htmlFor="linkedinUrl">LinkedIn URL</Text>
            <br />
            <TextField.Root id="linkedinUrl" name="linkedinUrl" value={profileData.linkedinUrl} onChange={handleChange} placeholder="Linkedin URL">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Email */}
            <Text htmlFor="email">Email</Text>
            <br />
            <TextField.Root id="email" name="email" value={profileData.email} onChange={handleChange} placeholder="Email">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Scheduling URL */}
            <Text htmlFor="schedulingUrl">Scheduling Link</Text>
            <br />
            <TextField.Root id="schedulingUrl" name="schedulingUrl" value={profileData.schedulingUrl} onChange={handleChange} placeholder="schedulingUrl">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* ProgramType */}
            <Text htmlFor="programType">Current educational program type</Text>
            <br />
            <select id="programType" name="programType" value={profileData.programType} onChange={handleChange}>
              <option value="">Select Program Type</option>
              {programTypes.map(programType => (
                <option key={programType} value={programType}>{programType}</option>
              ))}
            </select>
            <br />
            <br />

            {/* Previous Education */}
            <Text htmlFor="previousEducation">Education History</Text>
            <br />
            <TextField.Root id="previousEducation" name="previousEducation" value={profileData.previousEducation} onChange={handleChange} placeholder="Previous Education">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Employment History */}
            <Text htmlFor="employmentHistory">Employment History</Text>
            <br />
            <TextField.Root id="employmentHistory" name="employmentHistory" value={profileData.employmentHistory} onChange={handleChange} placeholder="Employment History">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Technical */}
            <Text htmlFor="technical">Are you technical?</Text>
            <br />
            <select id="technical" name="technical" value={profileData.technical} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <br />
            <br />

            {/* Impressive Acomplishment */}
            <Text htmlFor="impressiveAccomplishmnet">Brag About an Impressive Accomplishment</Text>
            <br />
            <TextField.Root id="impressiveAccomplishmnet" name="impressiveAccomplishmnet" value={profileData.impressiveAccomplishmnet} onChange={handleChange} placeholder="Impressive Accomplishment">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Connection Interests */}
            <Text htmlFor="connectionInterest">What kinds of connections are you looking for on this app?</Text>
            <br />
            <TextField.Root id="connectionInterest" name="connectionInterest" value={profileData.connectionInterest} onChange={handleChange} placeholder="e.g. I'm looking to meet a technical cofounder for a business venture in the healthcare space">
              <TextField.Slot />
            </TextField.Root>
            <br />
            <br />


            {/* Interest in Being Cofounder */}
            <Text htmlFor="interestedInBeingACofounder">Are you interested in starting a business or finding a cofounder?</Text>
            <br />
            <>
              <Select.Root id="interestedInBeingACofounder"
                name="interestedInBeingACofounder"
                value={profileData.interestedInBeingACofounder}
                onValueChange={(value) => handleChange({ target: { name: 'interestedInBeingACofounder', value } })}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="true">Yes</Select.Item>
                  <Select.Item value="false">No</Select.Item>
                </Select.Content>
              </Select.Root>
            </>
            <br />



            <br />

            {/* Industry Interests */}
            <Text htmlFor="industryInterests">What industries are you interested in?</Text>
            <br />
            <br />
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 140 }}>
              <CheckboxGroup.Root
                name="industryInterests"
                value={profileData.industryInterests}
                id="checkbox-grid"
                onValueChange={values => handleChange({ target: { name: 'industryInterests', value: values } })} >
                {industryInterests.map(industry => (
                  <CheckboxGroup.Item key={industry} value={industry}>
                    {industry}
                  </CheckboxGroup.Item>
                ))}
              </CheckboxGroup.Root>
            </ScrollArea>
            <br />

            {/* Areas of Responsibility */}
            <Text htmlFor="areasOfResponsibility">What skills do you have?</Text>
            <br />
            <br />
            <CheckboxGroup.Root
              name="areasOfResponsibility"
              value={profileData.areasOfResponsibility}
              id="checkbox-grid"
              onValueChange={values => handleChange({ target: { name: 'areasOfResponsibility', value: values } })} >
              {areasOfResponsibility.map(area => (
                <CheckboxGroup.Item key={area} value={area}>
                  {area}
                </CheckboxGroup.Item>
              ))}
            </CheckboxGroup.Root>
            <br />

            {/* HasIdea */}
            <Text htmlFor="hasIdea">Do you have a business idea you want to work on?</Text>
            <br />
            <select id="hasIdea" name="hasIdea" value={profileData.hasIdea} onChange={handleChange}>
              <option value="">Select Idea Status</option>
              {hasIdea.map(idea => (
                <option key={idea} value={idea}>{idea}</option>
              ))}
            </select>
            <br />
            <br />

            {/* Potential Ideas */}
            <Text htmlFor="potentialIdeas">If you have any business ideas, what are some you might like to work on?</Text>
            <br />
            <TextField.Root id="potentialIdeas" name="potentialIdeas" value={profileData.potentialIdeas} onChange={handleChange} placeholder="e.g. I have an idea for a mobile app that helps people find the best local restaurants">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/* Cofounder Desired Qualities */}
            <Text htmlFor="cofounderDesiredQualities">What qualities are you looking for in a cofounder?</Text>
            <br />
            <TextField.Root id="cofounderDesiredQualities" name="cofounderDesiredQualities" value={profileData.cofounderDesiredQualities} onChange={handleChange} placeholder="e.g. I'm looking for someone who is passionate about technology and has experience in marketing">
              <TextField.Slot />
            </TextField.Root>
            <br />

            {/*Submit Button*/}
            <Button type="submit" style={{marginBottom: '20px', minWidth: '100px'}}>Save</Button>
          </form>
        </div>
      </Flex>

    </>
  );
}

export default EditProfile