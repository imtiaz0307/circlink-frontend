import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../AppState/AppContext'
import { CgProfile } from 'react-icons/cg'
import { GrHome } from 'react-icons/gr'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineExplore } from 'react-icons/md'
import { IoExitOutline, IoPeopleCircleOutline } from 'react-icons/io5'

const Navbar = () => {
    // contexts
    const { isAuthenticated, setIsAuthenticated, showProfileMenu, setShowProfileMenu, currentUser, setCurrentUser, url, setCurrentUserLoaded } = useContext(AppContext)

    // logout handler
    const logoutHandler = () => {
        localStorage.removeItem('auth-token')
        setIsAuthenticated(false)
    }

    // getting current user
    useEffect(() => {
        const getCurrentUser = async () => {
            const response = await fetch(`${url}/api/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            const data = await response.json()
            setCurrentUserLoaded(true)
            setCurrentUser(data)
        }
        getCurrentUser()
    }, [isAuthenticated])

    return (
        <div className="navbarWrapper">
            <nav className="navbar">
                <div className="logo">
                    <Link to='/'>CircLink</Link>
                </div>
                {
                    isAuthenticated &&
                    <ul className="mainMenu">
                        <li><NavLink to='/'><GrHome className='icon' /></NavLink></li>
                        <li><NavLink to='/'><AiOutlineSearch className='icon' /></NavLink></li>
                        <li><NavLink to='/explore'><MdOutlineExplore className='icon' /></NavLink></li>
                        <li><NavLink to='/suggestions'><IoPeopleCircleOutline className='icon' /></NavLink></li>
                        <li style={{ cursor: 'pointer' }}>
                            <span onClick={(e) => {
                                setShowProfileMenu(true)
                                e.stopPropagation()
                            }}>{currentUser.profilePicture
                                ?
                                <img src={currentUser.profilePicture} alt={currentUser.name} />
                                :
                                <CgProfile className='icon' />}</span>
                            {
                                showProfileMenu &&
                                <ul className="profileMenu">
                                    <li><NavLink to={`/users/${currentUser.userName}`}><CgProfile className='icon' />Profile</NavLink></li>
                                    <li onClick={logoutHandler}><NavLink><IoExitOutline className='icon' />Logout</NavLink></li>
                                </ul>
                            }
                        </li>
                    </ul>
                }
            </nav>
        </div>
    )
}

export default Navbar