import './styles/Explore.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../AppState/AppContext'
import PostCard from '../components/PostCard/PostCard'

const Explore = () => {
    const { url, currentUser } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState('')

    useEffect(() => {
        const getTimeline = async () => {
            const response = await fetch(`${url}/api/posts/public/explore`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            const data = await response.json()
            setPosts(data.reverse())
            setIsLoading(false)
        }
        getTimeline()
    }, [])
    return (
        <div className='explorePage'>
            {
                !isLoading
                    ?
                    <>
                        <h3>Posts From Community Members</h3>
                        {posts.map((post, index) => {
                            return < PostCard post={post} isCurrentUser={currentUser._id == post.user._id} key={index} />
                        })
                        }
                        <p>No more posts.</p>
                    </>
                    :
                    'lodaidn'
            }
        </div>
    )
}

export default Explore