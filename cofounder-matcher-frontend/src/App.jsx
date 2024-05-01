
import './App.css'


import { Route, Routes } from 'react-router-dom'

// Components
import { Flex, Text, Button } from '@radix-ui/themes';
import HomePage from './pages/HomePage/HomePage.jsx'
import ProfileSearch from './pages/ProfileSearch/ProfileSearch.jsx'
import Conversations from './pages/Conversations/Conversations.jsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx';
import CreateProfile from './pages/CreateProfile/CreateProfile.jsx';
import Login from './pages/Login/Login.jsx';
import ActiveConversation from './pages/ActiveConversation/ActiveConversation.jsx';
import MyProfile from './pages/MyProfile/MyProfile.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import Navbar from './components/navBar/navBar.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile-search' element={<ProfileSearch />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/conversations' element={<Conversations />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/create-profile' element={<CreateProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/active-conversation' element={<ActiveConversation />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </>

  )
}
export default App