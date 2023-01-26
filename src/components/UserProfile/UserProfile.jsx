import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppState/AppContext'
import PostsTab from '../PostsTab/PostsTab'
import './UserProfile.css'

const UserProfile = (props) => {
    const { currentUser, url, currentUserLoaded } = useContext(AppContext)
    const { user } = props
    const isCurrentUser = user.userName === currentUser.userName
    const [isFollowing, setIsFollowing] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [followersCount, setFollowersCount] = useState(user.followers.length)

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
        isFollowing ? setFollowersCount(followersCount - 1) : setFollowersCount(followersCount + 1)
    }

    // 
    useEffect(() => {
        if (currentUserLoaded) {
            for (let i in currentUser.following) {
                if (currentUser.following[i]._id == user._id) {
                    setIsFollowing(true)
                    break
                }
            }
        }
    }, [currentUserLoaded])

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
            <ul className="onProfileNavigation">
                <li onClick={() => setActiveTab(0)} className={`${activeTab === 0 && 'active'}`}>Posts</li>
                <li onClick={() => setActiveTab(1)} className={`${activeTab === 1 && 'active'}`}>Followers <span style={{
                    background: 'black',
                    color: 'white',
                    padding: '0 10px',
                    borderRadius: '50px'
                }}>{followersCount}</span></li>
                <li onClick={() => setActiveTab(2)} className={`${activeTab === 2 && 'active'}`}>Followings <span style={{
                    background: 'black',
                    color: 'white',
                    padding: '0 10px',
                    borderRadius: '50px'
                }}>{user.following.length}</span></li>
                <li onClick={() => setActiveTab(3)} className={`${activeTab === 3 && 'active'}`}>About</li>
                {isCurrentUser && <li onClick={() => setActiveTab(4)} className={`${activeTab === 4 && 'active'}`}>Settings</li>}
            </ul>
            <PostsTab activeTab={activeTab} username={user.userName} url={url} isCurrentUser={isCurrentUser} />
            <div className="tabs" hidden={activeTab !== 1}>followers</div>
            <div className="tabs" hidden={activeTab !== 2}>following</div>
            <div className="tabs" hidden={activeTab !== 3}>about</div>
            <div className="tabs" hidden={activeTab !== 4}>setting</div>
        </div>
    )
}

export default UserProfile