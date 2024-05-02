import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Text, Card, Box, Heading } from '@radix-ui/themes';
import logo from '../../../images/logo.png';
import { NavLink } from 'react-router-dom';
import { getAllFavoritesByUserId } from '../../services/apiServices.js';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const userId = 'yourUserId';
    getAllFavoritesByUserId()
      .then(response => {
        setFavorites(response.data); 
      })
      .catch(error => {
        console.error("Failed to load favorites", error);
        setError('Failed to load favorites');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box>
      <br/>
      <img src={logo} alt="Logo" style={{ width: '300px', height: 'auto', borderRadius: '30%' }} className="logo" /><br/><br/><br/>
      <Heading>My Favorite Profiles</Heading>
      <Grid columns={1} style={{ gap: '20px' }}>
        {favorites.map((profile, index) => (
          <Card key={index} style={{ padding: '20px' }}>
            <Avatar src={profile.picture || 'defaultAvatar.png'} />
            <Text>{profile.name}</Text>
            <Text>{profile.school}</Text>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};
export default Favorites