import { AppContext } from './AppContext'
import { useState } from 'react'


const AppState = (props) => {
    // website link
    const url = 'http://localhost:3000'

    // auth
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth-token'))

    return (
        <AppContext.Provider value={{ url, isAuthenticated, setIsAuthenticated }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState