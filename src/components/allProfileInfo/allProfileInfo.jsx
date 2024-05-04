import React from 'react';
import { Text } from '@radix-ui/themes';
import CreateProfile from '../../pages/CreateProfile/CreateProfile.jsx';
import CreateProfile2 from '../../pages/CreateProfile/CreateProfile2.jsx';  
import CreateProfile1 from '../../pages/CreateProfile/CreateProfile1.jsx';

const AllProfileInfo = ({ profile }) => {
  return (
    <>
      {profile && (
        <>
          <Text>Email:  {profile.email}</Text>
          <Text>Connection Interest:  {profile.connectionInterest}</Text>
          <Text>Industry Interests:  {profile.industryInterests?.join(', ')}</Text>
          <Text>Has Idea:  {profile.hasIdea}</Text>
          <Text>Interested In Being A Cofounder:  {profile.interestedInBeingACofounder ? "Yes" : "No"}</Text>
          <Text>Employment History:  {profile.employmentHistory}</Text>
          <Text>Cofounder Desired Qualities:  {profile.cofounderDesiredQualities}</Text>
          <Text>Potential Ideas: {profile.potentialIdeas}</Text>
          <Text>Previous Education:  {profile.previousEducation}</Text>
          <Text>program Type:  {profile.programType}</Text>
          <Text>Technical:  {profile.technical}</Text>
          <Text>linkedinUrl:  {profile.linkedinUrl}</Text>
          <Text>Areas Of Responsibility:{profile.areasOfResponsibility?.join(', ')}</Text>
          <Text>Created At:  {profile.createdAt}</Text>
          <Text>Last Seen:  {profile.lastSeen}</Text>
          <Text>Updated At:  {profile.updatedAt}</Text>
        </>
      )}
    </>
  );
}

export default AllProfileInfo;
