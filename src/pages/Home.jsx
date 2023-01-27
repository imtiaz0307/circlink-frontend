import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../AppState/AppContext'
import PostCard from '../components/PostCard/PostCard'
import './styles/Home.css'

const Home = () => {
    const { url, currentUser } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState('')

    useEffect(() => {
        const getTimeline = async () => {
            const response = await fetch(`${url}/api/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            let data = await response.json()

            data = await data.sort((x, y) => {
                return new Date(x.createdAt) < new Date(y.createdAt) ? 1 : -1
            })

            setPosts(data)
            setIsLoading(false)
        }
        getTimeline()
    }, [])
    return (
        <>
            {
                isLoading
                    ?
                    'Loading...'
                    :
                    <div className="home">
                        <div className="homePagePosts">
                            {
                                posts.length > 0
                                    ?
                                    <>
                                        {
                                            posts.map((post, index) => {
                                                return < PostCard post={post} isCurrentUser={currentUser._id == post.userid} key={index} />

                                            })
                                        }
                                        <p>No More Posts.</p>
                                    </>
                                    :
                                    <p className='no posts'>No Posts To Show</p>
                            }
                        </div>
                        <div className="suggestions">
                            Friends suggestions will be show here.
                        </div>
                    </div>
            }
        </>
    )
}

export default Home