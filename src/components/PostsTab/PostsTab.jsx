import './PostsTab.css'
import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'

const PostsTab = ({ activeTab, userid, url, isCurrentUser }) => {
    const [posts, setPosts] = useState([])
    const [postsLoaded, setPostsLoaded] = useState(false)

    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`${url}/api/posts/getuserposts/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'applications/json'
                }
            })
            const data = await response.json()
            setPosts(data.reverse())
            setPostsLoaded(true)
        }
        fetchUserPosts()
    }, [userid])

    return (
        <div hidden={activeTab !== 0} style={{ padding: '1rem 0' }}>
            {
                postsLoaded
                    ?
                    posts.length > 0
                        ?
                        <>
                            {
                                posts.map((post, index) => {
                                    return < PostCard post={post} isCurrentUser={isCurrentUser} key={index} />

                                })
                            }
                            <div style={{ padding: '2rem 0 0', textAlign: 'center' }}>No More Posts.</div>

                        </>

                        :
                        <div className='noPostError'>User has no posts.</div>
                    :
                    <div>Loading...</div>
            }
        </div>
    )
}

export default PostsTab