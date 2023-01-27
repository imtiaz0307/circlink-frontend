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
                        {
                            posts.length > 0
                                ?
                                <>
                                    <h3>Posts From Community Members</h3>
                                    <div className='postsGrid'>
                                        {posts.map((post, index) => {
                                            return < PostCard post={post} isCurrentUser={currentUser._id == post.userid} key={index} />
                                        })
                                        }
                                    </div>
                                    <p>No more posts.</p>
                                </>
                                :
                                <p className='no posts'>No Posts To Show</p>
                        }
                    </>
                    :
                    'loading'
            }
        </div>
    )
}

export default Explore