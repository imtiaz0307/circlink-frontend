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
    const [profilePicture, setProfilePicture] = useState('')
    const [coverPicture, setCoverPicture] = useState('')

    // follow/unfollow user
    const followUnfollowHandler = async () => {

        await fetch(`${url}/api/users/${user._id}/${isFollowing ? 'unfollow' : 'follow'}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })

        setIsFollowing(!isFollowing)
        isFollowing ? setFollowersCount(followersCount - 1) : setFollowersCount(followersCount + 1)
    }

    // change profile picture
    const changeProfileHandler = (e) => {
        const file = e.target.files[0]
        if (file.size > 2048000) {
            alert('File size exceeding the limit')
        }
        else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = async () => {

                await fetch(`${url}/api/users/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({ name: currentUser.name, userName: currentUser.userName, profilePicture: reader.result })
                })

                setProfilePicture(reader.result)
            }
        }
    }

    // change profile picture
    const changeCoverHandler = (e) => {
        const file = e.target.files[0]
        if (file.size > 2048000) {
            alert('File size exceeding the limit')
        }
        else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = async () => {

                await fetch(`${url}/api/users/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({ name: currentUser.name, userName: currentUser.userName, coverPicture: reader.result })
                })

                setCoverPicture(reader.result)
            }
        }
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
            <div className="profileLoader"></div>
            <div className="coverPhoto">
                {
                    user.coverPicture
                    &&
                    <img src={coverPicture || user.coverPicture} alt={`${user.name}'s Cover Photo.`} className='coverImage' />
                }
                {
                    isCurrentUser
                    &&
                    <form>
                        <label htmlFor="changeCover">Change Cover Photo</label>
                        <input type="file" id="changeCover" hidden onChange={changeCoverHandler} multiple={false} accept='image/*' />
                    </form>
                }
            </div>
            <div className="profilePhoto">
                {
                    user.profilePicture &&
                    <img src={profilePicture || user.profilePicture} alt={user.name} />
                }
                {
                    isCurrentUser
                    &&
                    <form>
                        <label htmlFor="changeProfile">Change</label>
                        <input type="file" id="changeProfile" hidden onChange={changeProfileHandler} multiple={false} accept='image/*' />
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
            <PostsTab activeTab={activeTab} userid={user._id} url={url} isCurrentUser={isCurrentUser} />
            <div className="tabs" hidden={activeTab !== 1}>followers</div>
            <div className="tabs" hidden={activeTab !== 2}>following</div>
            <div className="tabs" hidden={activeTab !== 3}>about</div>
            <div className="tabs" hidden={activeTab !== 4}>setting</div>
        </div>
    )
}

export default UserProfile