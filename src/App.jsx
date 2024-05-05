
import './App.css'


import { Route, Routes } from 'react-router-dom'

// Components
import HomePage from './pages/HomePage/HomePage.jsx'
import ProfileSearch from './pages/ProfileSearch/ProfileSearch.jsx'
import Conversations from './pages/Conversations/Conversations.jsx';
import CreateAccount from './pages/CreateAccount/CreateAccount.jsx';
import CreateProfile from './pages/CreateProfile/CreateProfile.jsx';
import CreateProfile1 from './pages/CreateProfile/CreateProfile1.jsx';
import CreateProfile2 from './pages/CreateProfile/CreateProfile2.jsx';
import Login from './pages/Login/Login.jsx';
import ActiveConversation from './pages/ActiveConversation/ActiveConversation.jsx';
// import MyProfile from './pages/MyProfile/MyProfile.jsx';
import EditProfile from './pages/EditProfile/EditProfile.jsx';
import MyProfile from './pages/MyProfile/MyProfile.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import Navbar from './components/navBar/navBar.jsx'
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes.jsx';

function App() {
  return (
    <>
      <div className="fixed-background"></div>
      <Navbar />
      <div className="scrollable-content">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile-search' element={<ProtectedRoutes><ProfileSearch /></ProtectedRoutes>} />
          <Route path='/conversations' element={<Conversations />} />
          <Route path='/create-account' element={<CreateAccount />} />
          <Route path='/create-profile' element={<CreateProfile />} />
          <Route path='/create-profile1' element={<CreateProfile1 />} />
          <Route path='/create-profile2' element={<CreateProfile2 />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/conversations/:conversationId' element={<ActiveConversation />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </>

  )
}
export default App