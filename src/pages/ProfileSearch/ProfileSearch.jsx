import React, { useState, useEffect } from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Avatar, Grid, Button, Text, Card, Box} from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { getProfilesByQuery } from '../../services/apiServices.js';
import ProfileCard from '../../components/profileCard/profileCard.jsx';
import { getSchools } from '../../services/apiServices.js';
import { getSchoolById } from '../../services/apiServices.js'; 
import { getProgramTypes } from '../../services/apiServices.js';

import AllProfileInfo from '../../components/allProfileInfo/allProfileInfo.jsx';



const ProfileSearch = () => {
  const [filters, setFilters] = useState({
    currentSchool: '', program:'', technical: false
  });
  const [profileArray, setProfileArray] = useState([]);
  const [profileIndex, setProfileIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const query = {}
  
  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      console.log('Filtros aplicados:', filters);
      Object.entries(filters).map(([key, value]) => {
        if (value) {
          query[key] = value
        }
        return null;
      })
      const profiles = await getProfilesByQuery(query);
      if (profiles && profiles.data && profiles.data.length > 0) {
        setProfileArray(profiles.data);
        setProfileIndex(0);
        console.log(profileArray)
      } else {
        setProfileArray([]); 
      }
      setLoading(false); 
    }
    fetchProfiles();
  }, [filters]);

  const handleSkip = () => {
    setProfileIndex(prevIndex => (prevIndex + 1) % profileArray.length);
  };

  console.log("Rendering with profile:", profileArray[profileIndex]);

  return (
    <>
      <Box style={{
        marginTop: '70px',
        width: '100%'}}>
        <Filters setFilters={setFilters} />
      
      <Grid columns={3} rows={4} style={{ gap: '20px', marginBottom: '20px' }}>
      <ProfileCard profile={profileArray[profileIndex]} />
      <AllProfileInfo profile={profileArray[profileIndex]} />
      <div style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'black',
        textAlign: 'center',      // Center the buttons
        padding: '10px 0'
      }}>
        <Button onClick={handleSkip} style={{ marginRight: '10px' }} variant="soft">Skip for now</Button>
        <Button><NavLink to='/conversation' style={{
          margin: '20px',
          textDecoration: 'none',
          color: 'inherit'
        }}>Message</NavLink></Button>
      </div>
      </Grid>

      </Box>
    </>
  );
};

export default ProfileSearch;

