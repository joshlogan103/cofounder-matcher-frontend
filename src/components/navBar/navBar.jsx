import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import { removeToken } from '../../services/tokenServices';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, Button, Flex } from '@radix-ui/themes'
import logo from '../../../images/logo1.png';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)

    const handleClick = () => {
        setIsOpen(false);
    }

    const handleLogOut = () => {
        removeToken()
        setIsUserLoggedIn(false)
        navigate('/login')
    }

    return (
        <div style={{
            position: 'fixed', 
            top: 0, 
            backgroundColor: 'black', 
            width: '100%', 
            zIndex: 2000,
            display: 'flex',  // Ensures the container is a flex container
            justifyContent: 'space-between', // Pushes children to opposite ends
            alignItems: 'center', // Align items vertically in the middle
            padding: '10px 20px' // Add some padding around the contents
        }}>
            { isUserLoggedIn && (
                <Flex style={{ width: '100%', height: '100%' }}>
                    <img src={logo} alt="Logo" style={{ width: '30px', height: 'auto' }} className="logo" />
                    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenu.Trigger style={{ marginLeft: 'auto' }} asChild>
                            <Button className="dropdown-trigger">Menu &#9776;</Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="dropdown-content">
                            {['/my-profile', '/profile-search', '/conversations', '/favorites'].map((path, index) => (
                                <DropdownMenu.Item key={index} className="dropdown-menu-item">
                                    <NavLink to={path} className="nav-link" onClick={handleClick}>
                                        {path === '/my-profile' ? 'My Profile' :
                                        path === '/profile-search' ? 'Search Profiles' :
                                        path === '/conversations' ? 'Inbox' :
                                        path === '/favorites' ? 'Favorites' :
                                        'Home'}
                                    </NavLink>
                                </DropdownMenu.Item>
                            ))}
                            <Button className='logout' onClick={handleLogOut}>Log Out</Button>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            )}
        </div>
    )
}


export default Navbar;