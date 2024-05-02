import React, { useState, useEffect } from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Avatar, Grid, Button, Text, Card } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { getProfiles } from '../../services/apiServices.js';
import ProfileCard from '../../components/profileCard/profileCard.jsx';

const ProfileSearch = () => {
  const [profile, setProfile] = useState({});
  const [profileArray, setProfileArray] = useState([]);
  const [profileIndex, setProfileIndex] = useState(0);

  useEffect(() => {
    async function fetchProfiles() {
      const profiles = await getProfiles();
      if (profiles && profiles.data && profiles.data.length > 0) {
        setProfileArray(profiles.data);
        console.log(profileArray)
      }
    }
    fetchProfiles();
  }, []);

  useEffect(() => {
    if (profileArray.length > 0 && profileIndex < profileArray.length) {
      setProfile(profileArray[profileIndex]);
    }
  }, [profileArray, profileIndex]);

  const handleSkip = () => {
    setProfileIndex(prevIndex => (prevIndex + 1) % profileArray.length);
  };

  console.log("Rendering with profile:", profile);

  return (
    <>
      <Filters />
      <Grid columns={3} rows={4} style={{ gap: '20px', marginBottom: '20px' }}>
        <ProfileCard profile={profile} />
        <Button onClick={handleSkip}>Skip for now</Button><br/><br/>
        <Button><NavLink to='/conversation'>Message</NavLink></Button>
      </Grid>
    </>
  );
};

export default ProfileSearch;
