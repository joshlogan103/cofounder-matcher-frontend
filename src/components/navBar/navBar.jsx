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

    const handleGoToHome = () => {
        navigate('/')
    }

    return (
        <div style={{
            position: 'fixed', 
            top: 0, 
            backgroundColor: 'black', 
            width: '100%', 
            zIndex: 2000,
            display: 'flex',  
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px 20px' 
        }}>
            { isUserLoggedIn && (
                <Flex style={{ width: '100%', height: '100%' }}>
                    <img src={logo} alt="Logo" style={{ width: '30px', height: 'auto' }} onClick={handleGoToHome} className="logo" />
                    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenu.Trigger style={{ marginLeft: 'auto' }} asChild>
                            <Button className="dropdown-trigger" style={{ fontSize: '24px'}}>&#9776;</Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="dropdown-content">
                            {['/my-profile', '/conversations', '/favorites', '/profile-search'].map((path, index) => (
                                <DropdownMenu.Item key={index} className="dropdown-menu-item">
                                    <NavLink to={path} className="nav-link" onClick={handleClick}>
                                        {path === '/my-profile' ? 'My Profile' :
                                        path === '/conversations' ? 'Inbox' :
                                        path === '/favorites' ? 'Favorites' :
                                        path === '/profile-search' ? 'Search Profiles' :
                                        'Home'}
                                    </NavLink>
                                </DropdownMenu.Item>
                            ))}
                            <Button className='logout' onClick={handleLogOut} style={{ marginTop: '5px'}}>Log Out</Button>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
            )}
        </div>
    )
}


export default Navbar;