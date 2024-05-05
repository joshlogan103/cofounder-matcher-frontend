import { Card, Text, Button, Avatar, Box, Flex } from '@radix-ui/themes';
import { useState, useEffect, useCallback } from 'react';
import { createFavorite, getSchoolById, deleteFavoriteById, getAllFavoritesByUserId } from '../../services/apiServices.js';
import { StarIconEmpty, StarIconFilled } from '../StarIcons/StarIcons.jsx';

const ProfileCard = ({ profile }) => { 
  const [ favoriteStatus, setFavoriteStatus ] = useState(false)
  const [ favoriteId, setFavoriteId ] = useState('')
  const [ schoolName, setSchoolName ] = useState('')

  const addToFavorites = useCallback(async () => {
    try {
      const newFavorite = await createFavorite({profileId: profile._id});
      if (newFavorite && newFavorite.data) {
        console.log(newFavorite.data._id)
        setFavoriteStatus(true)
        setFavoriteId(newFavorite.data._id)
        console.log(`This is the new favorite ID : ${favoriteId}`)
        console.log("Added to favorites:", profile);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  },[profile._id])

  const removeFromFavorites = useCallback(async () => {
    if (!favoriteId) return
    try {
      await deleteFavoriteById(favoriteId)
      setFavoriteStatus(false)
      setFavoriteId('')
      console.log("Removed from favorites:", profile);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }, [favoriteId, profile])

  useEffect(() => {
    const fetchSchoolName = async () => {
      if (profile && profile.currentSchool) {
        try {
          const response = await getSchoolById(profile.currentSchool);
          console.log("School name response:", response);
          setSchoolName(response.data.name || 'Unknown school');
          console.log("School name:", schoolName);
        } catch (error) {
          console.error("Failed to fetch school name:", error);
          setSchoolName('Unknown School');
        }
      }
    };
    const fetchFavoriteStatus = async () => {
      const favoritesArray = await getAllFavoritesByUserId()
      console.log(favoritesArray.data)
      const favorite = favoritesArray.data.find(favorite => (
        favorite.favoritedProfile === profile._id
      ))
      if (favorite) {
        setFavoriteStatus(true)
        setFavoriteId(favorite._id)
      } else {
        setFavoriteStatus(false)
        setFavoriteId('')
      }
    }
    fetchSchoolName()
    fetchFavoriteStatus()
  },[profile])

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
        <Button onClick={favoriteStatus === false ? addToFavorites : removeFromFavorites}>{favoriteStatus === true ? <StarIconFilled /> : <StarIconEmpty />}</Button>
      </Flex>
    </Card>
  </Box>
  )
}

export default ProfileCard;
