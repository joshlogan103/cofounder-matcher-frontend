import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';
import { removeToken } from '../../services/tokenServices';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, Button, Flex } from '@radix-ui/themes'
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
        <>
            { isUserLoggedIn && (
                <Flex gap="3" justify="end">
                    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                        <DropdownMenu.Trigger asChild>
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
        </>
    )
}


export default Navbar;