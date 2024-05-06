import { useState, useEffect } from 'react';
import Filters from '../../components/filters/filters.jsx';
import { Grid, Button, Box } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import { getProfilesByQuery } from '../../services/apiServices.js';
import ProfileCard from '../../components/profileCard/profileCard.jsx';
import AllProfileInfo from '../../components/allProfileInfo/allProfileInfo.jsx';
import Loading from '../../components/Loading/Loading.jsx';

const ProfileSearch = () => {
  const [filters, setFilters] = useState({
    currentSchool: '', program: '', technical: false
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
  }, []);

  const handleSearch = async () => {
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

  const handleSkip = () => {
    setProfileIndex(prevIndex => (prevIndex + 1) % profileArray.length);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  };

  if (loading) return (
    <Loading />
  )

  console.log("Rendering with profile:", profileArray[profileIndex]);

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box style={{
          marginTop: '70px',
          width: '85vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            <Filters setFilters={setFilters} handleSearch={handleSearch}/>
          </div>
          <Grid columns={3} rows={4} style={{
            gap: '20px',
            marginBottom: '20px',
            width: '100%',
            justifyContent: 'center'
          }}>
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
      </div>
    </>
  );
};

export default ProfileSearch;

