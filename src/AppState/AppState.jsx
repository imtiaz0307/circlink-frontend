import { AppContext } from './AppContext'
import { useState } from 'react'


const AppState = (props) => {
    // states
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [currentUser, setCurrentUser] = useState('')
    const [currentUserLoaded, setCurrentUserLoaded] = useState(false)
    const [autoRefresher, setAutoRefresher] = useState(0)

    // website link
    const url = 'http://localhost:3000'

    // auth
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth-token'))

    // get user by id
    const getUserById = async (userid) => {

        const response = await fetch(`${url}/api/users/id/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicaiton/json'
            }
        })

        const data = await response.json()
        return data
    }

    return (
        <AppContext.Provider value={{ url, isAuthenticated, setIsAuthenticated, showProfileMenu, setShowProfileMenu, currentUser, setCurrentUser, currentUserLoaded, setCurrentUserLoaded, getUserById, autoRefresher, setAutoRefresher, }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState