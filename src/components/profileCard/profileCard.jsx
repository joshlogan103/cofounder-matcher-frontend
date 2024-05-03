import React from 'react';
import { Card, Text, Button, Avatar, Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { getFavorites, createFavorite } from '../../services/apiServices.js';


const ProfileCard = ({ profile }) => { 
  const navigate = useNavigate();
  const addToFavorites = async () => {
    try {
      await getFavorites(profile);
      console.log("Added to favorites:", profile);
      navigate('/favorites', { replace: true });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  if (!profile) {
    return <Card style={{ margin: '15px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (
    <Box>
    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', margin: '15px', padding: '20px', width: '100%' }}>
      Profile Card
      <br/><br/>
      <Avatar src={profile  && profile.avatar} alt={profile && profile.fullName} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <br/><br/>
      <Text>{profile.fullName}</Text><br/>
      <Button onClick={addToFavorites}>⭐</Button>
      <Text>{profile.aboutMe}</Text>
      <Text>{profile.programType}</Text>
      <Text>{profile.connectionInterest}</Text>
    </Card>
    <></>
    </Box>
  )
}

export default ProfileCard;
