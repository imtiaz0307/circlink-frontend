import { AppContext } from './AppContext'
import { useState } from 'react'


const AppState = (props) => {
    // states
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [currentUser, setCurrentUser] = useState('')

    // website link
    const url = 'http://localhost:3000'

    // auth
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth-token'))

    return (
        <AppContext.Provider value={{ url, isAuthenticated, setIsAuthenticated, showProfileMenu, setShowProfileMenu, currentUser, setCurrentUser }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState