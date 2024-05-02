import React from 'react';
import { Card, Text, Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';


const ProfileCard = ({ profile }) => { 
  const navigate = useNavigate();
  const addToFavorites = () => {
    console.log("Adding to favorites:", profile);
    navigate('/favorites');
  };

  if (!profile) {
    return <Card style={{ margin: '20px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (

<Card style={{ display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start',   
    justifyContent: 'space-between',
    margin: '20px', 
    padding: '20px',
    width: '100%'}}>Profile Card
<br/><br/>

{/* <Avatar>picture</Avatar> */}


<br/><br/><Text>{profile.fullName}</Text><br/>
<Button>⭐</Button>
  <Text>{profile.aboutMe}</Text>
  <Text>{profile.programType}</Text>
  <Text>{profile.connectionInterest}</Text>
</Card>
  )
}

export default ProfileCard;