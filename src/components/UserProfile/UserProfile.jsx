import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppState/AppContext'
import { FaCity } from 'react-icons/fa'
import './UserProfile.css'

const UserProfile = (props) => {
    const { currentUser, url } = useContext(AppContext)
    const { user } = props
    const isCurrentUser = user.userName === currentUser.userName
    const [isFollowing, setIsFollowing] = useState(false)

    // follow/unfollow user
    const followUnfollowHandler = async () => {
        const response = await fetch(`${url}/api/users/${user._id}/${isFollowing ? 'unfollow' : 'follow'}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        const data = await response.json()
        setIsFollowing(!isFollowing)
    }

    // 
    useEffect(() => {
        currentUser?.following?.some(followedUser => {
            setIsFollowing(followedUser?._id == user?._id)
        })
    }, [])
    return (
        <div className='userProfile'>
            <div className="coverPhoto">
                {
                    user.coverPicture
                    &&
                    <img src={user.coverPicture} alt={`${user.name}'s Cover Photo.`} className='coverImage' />
                }
                {
                    isCurrentUser
                    &&
                    <form>
                        <label htmlFor="changeCover">Change Cover Photo</label>
                        <input type="file" id="changeCover" hidden />
                    </form>
                }
            </div>
            <div className="profilePhoto">
                {
                    user.profilePicture &&
                    <img src={user.profilePicture} alt={user.name} />
                }
                {
                    isCurrentUser
                    &&
                    <form>
                        <label htmlFor="changeProfile">Change</label>
                        <input type="file" id="changeProfile" hidden />
                    </form>
                }
            </div>
            <div className="userDetails">
                <div className="nameAndUserName">
                    <h2 className="profileName">{user.name}</h2>
                    <div className="userNameAndCity">
                        <p className="profileUserName">@{user.userName}</p>
                        {
                            !isCurrentUser &&
                            <button className="followBtn" onClick={followUnfollowHandler}>
                                {
                                    isFollowing && isFollowing ? 'Unfollow' : 'Follow'
                                }
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile