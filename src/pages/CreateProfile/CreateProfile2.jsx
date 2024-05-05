import { updateProfileByUserId, getAreasOfResponsibility, getHasIdea, getIndustryInterests } from '../../services/apiServices.js'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './CreateProfile.css'

import { Flex, Button, Heading, Text, Progress, Box, CheckboxGroup, ScrollArea, Select, TextField } from '@radix-ui/themes'

const CreateProfile2 = () => {

  const token = sessionStorage.getItem('cofoundermatchersessionkey48484');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const [profileData, setProfileData] = useState({
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
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Execute all API calls concurrently
        const [ hasIdea, industryInterests, areasOfResponsibility] = await Promise.all([
          getHasIdea(),
          getIndustryInterests(),
          getAreasOfResponsibility()
        ]);

        console.log('Idea Response:', hasIdea);
        console.log('Industry Response:', industryInterests);
        console.log('Areas Response:', areasOfResponsibility);
  

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
      navigate('/profile-search');
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
      <Box display="block" style={{ justifyContent: 'center', position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'black', width: '100%',paddingTop: 50, paddingBottom: 0 }}>
        <>
          <Heading >Create Profile</Heading>
          <br/>
          <Text size="5">Interests and Ideas  </Text>
          <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          <br/>
          <br/>
          <Box maxWidth="300px">
            <Progress value={100}/>
          </Box>
          <br/>
        </>
      </Box>
      
      
      <form onSubmit={handleSubmit} style={{ marginTop: '150px' }}>
        
        <br/>
        {/* Connection Interests */}
        <label htmlFor="connectionInterest">What kinds of connections are you looking for on this app?</label>
        <br/>
        <TextField.Root id="connectionInterest" name="connectionInterest" value={profileData.connectionInterest} onChange={handleChange} placeholder="e.g. I'm looking to meet a technical cofounder for a business venture in the healthcare space">
          <TextField.Slot/>
        </TextField.Root>
        <br/>


        {/* Interest in Being Cofounder */}
        <label htmlFor="interestedInBeingACofounder">Are you interested in starting a business or finding a cofounder?</label>
        <br/>
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
        <br/>



        <br/>

        {/* Industry Interests */}
        <label htmlFor="industryInterests">What industries are you interested in?</label>
        <br/>
        <br/>
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
        <br/>

        {/* Areas of Responsibility */}
        <label htmlFor="areasOfResponsibility">What skills do you have?</label>
        <br/>
        <br/>
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
        <br/>

        {/* HasIdea */}
        <label htmlFor="hasIdea">Do you have a business idea you want to work on?</label>
        <br/>
        <select id="hasIdea" name="hasIdea" value={profileData.hasIdea} onChange={handleChange}>
        <option value="">Select Idea Status</option>
          {hasIdea.map(idea => (
            <option key={idea} value={idea}>{idea}</option>
          ))}
        </select>
        <br/>
        <br/>

        {/* Potential Ideas */}
        <label htmlFor="potentialIdeas">If you have any business ideas, what are some you might like to work on?</label>
        <br/>
        <TextField.Root id="potentialIdeas" name="potentialIdeas" value={profileData.potentialIdeas} onChange={handleChange} placeholder="e.g. I have an idea for a mobile app that helps people find the best local restaurants">
          <TextField.Slot/>
        </TextField.Root>
        <br/>

        {/* Cofounder Desired Qualities */}
        <label htmlFor="cofounderDesiredQualities">What qualities are you looking for in a cofounder?</label>
        <br/>
        <TextField.Root id="cofounderDesiredQualities" name="cofounderDesiredQualities" value={profileData.cofounderDesiredQualities} onChange={handleChange} placeholder="e.g. I'm looking for someone who is passionate about technology and has experience in marketing">
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

export default CreateProfile2
