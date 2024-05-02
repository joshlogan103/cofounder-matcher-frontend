import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo.png'
import { Button, Heading, Text, Box} from '@radix-ui/themes'
import './HomePage.css'
import SchoolCount from '../../components/SchoolCount/SchoolCount.jsx'


const HomePage = () => {
  return (
    <Box>
      <br/>
      <img src={logo} alt="Logo"style={{ width: '300px', height: 'auto', borderRadius: '30%'  }} className="logo" /><br/><br/><br/>

      <Heading>Find the Right Connections</Heading><br/><br/>

      <Heading>Change The World</Heading><br/> <br/>
      <Button> <NavLink to='/create-account'>Create an Account </NavLink></Button><br/><br/>
      <Text>Already have an account? <NavLink to='/login'>  Login</NavLink></Text>
      <SchoolCount/>
    </Box>
  
  )}
export default HomePage
