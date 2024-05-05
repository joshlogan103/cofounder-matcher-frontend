import { Card, Text, Button, Avatar, Box, Flex } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { createFavorite, getSchoolById, deleteFavoriteById, getAllFavoritesByUserId } from '../../services/apiServices.js';

const ProfileCard = ({ profile }) => { 
  const [ favoriteStatus, setFavoriteStatus ] = useState(false)
  const [ favoriteId, setFavoriteId ] = useState('')
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

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const favoritesArray = await getAllFavoritesByUserId()
      favoritesArray.forEach(favorite => {
        if (favorite.profileFavorited === profile._id) {
          setFavoriteStatus(true)
          setFavoriteId(favorite._id)
        }
      })
    }
    fetchFavoriteStatus()
  },[])

  const addToFavorites = async () => {
    try {
      await createFavorite({profileId: profile._id});
      console.log("Added to favorites:", profile);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await deleteFavoriteById(favoriteId)
      console.log("Removed from favorites:", profile);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  }

  if (!profile) {
    return <Card style={{ margin: '15px', padding: '20px' }}>Loading profile...</Card>;
  }

  return (

    <Box style={{ marginBottom: '20px', width: '90vw', maxWidth: '800px'}}>
    <Card>
      <Flex align="center" justify="space-between">
        <Flex gap="3" align="center" style={{ flex: 1 }}>
          <Avatar
            size="3"
            src={profile.profilePicture}
            alt={profile && profile.profilePicture}
            radius="full"
            fallback=""
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {profile.fullName}
            </Text>
            <Text as="div" size="2" color="gray">
              {schoolName} | {profile.programType}
            </Text>
          </Box>
        </Flex>
        <Button onClick={favoriteStatus === false ? addToFavorites : removeFromFavorites}>{favoriteStatus === true ? '⭐' : 'Hi'}</Button>
      </Flex>
    </Card>
  </Box>
  )
}

export default ProfileCard;
