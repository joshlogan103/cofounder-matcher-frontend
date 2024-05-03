import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Text, Card, Box, Heading } from '@radix-ui/themes';
import logo from '../../../images/logo.png';
import { getFavorites } from '../../services/apiServices.js';  // 
import ProfileCard from '../../components/profileCard/profileCard.jsx';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
      getFavorites()
        .then(response => {
          console.log(response);  
          const data = response.data; 
          setFavorites(data); 
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to load favorites", error);
          setError('Failed to load favorites');
          setLoading(false);
        });
    }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;
    // if (favorites.length === 0) return <div>No Favorites Found</div>; 

  return (
    <Box>
      <br/>
      <img src={logo} alt="Logo" style={{ width: '300px', height: 'auto', borderRadius: '30%' }}/><br/><br/><br/>
      <Heading>My Favorite Profiles</Heading>
      <Grid columns={1} style={{ gap: '20px' }}>
      <ProfileCard profile={profile} />
        {favorites.map((profile, index) => (
           <ProfileCard key={index} profile={profile} />
          
        ))}
      </Grid>
    </Box>
  );
};

export default Favorites;
