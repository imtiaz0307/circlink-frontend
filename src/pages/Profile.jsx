import './styles/Profile.css'
import { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../AppState/AppContext'
import UserError from '../components/UserError/UserError'
import UserProfile from '../components/UserProfile/UserProfile'

const Profile = () => {
    // constants
    const { url } = useContext(AppContext)
    const { username } = useParams()
    const [user, setUser] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${url}/api/users/${username}`)
            const data = await response.json()
            setUser(data)
            setIsLoading(false)
        }
        getUser()
    }, [username])

    return (
        <div className='profilePage'>
            {
                isLoading
                    ?
                    <div>Loading</div>
                    :
                    user.error
                        ?
                        <UserError />
                        :
                        <UserProfile user={user} />
            }
        </div>
    )
}

export default Profile