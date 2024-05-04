import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Text, Card, Box, Heading } from '@radix-ui/themes';
import { getAllFavoritesByUserId, getProfileById } from '../../services/apiServices';
import ProfileCard from '../../components/profileCard/profileCard.jsx';
const Favorites = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFavoritesAndProfiles = async () => {
      try {
        // First, fetch all favorites
        const response = await getAllFavoritesByUserId();
        const favoritesData = response.data;
        console.log(favoritesData);
        // Then, fetch profiles for each favorited ID
        const profilePromises = favoritesData.map(fav => getProfileById(fav.favoritedProfile));
        const profileResponses = await Promise.all(profilePromises);
        const profileData = profileResponses.map(res => res.data); // Extract just the data for each profile
        setProfiles(profileData); // Set profiles based on fetched data
      } catch (error) {
        console.error("Failed to load data", error);
        setError('Failed to load favorites or profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritesAndProfiles();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (profiles.length === 0) return <div>No Favorites Found</div>;
  return (
    <Box>
      <br/><br/><br/>
      <Heading>My Favorite Profiles</Heading>
      <Grid columns={1} style={{ gap: '20px' }}>
        {profiles.map(profile => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </Grid>
    </Box>
  );
};
export default Favorites;


