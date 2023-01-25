import React, { useEffect } from 'react'
import { useState } from 'react'
import PostCard from '../PostCard/PostCard'

const PostsTab = ({ activeTab, username, url }) => {
    const [posts, setPosts] = useState([])
    const [postsLoaded, setPostsLoaded] = useState(false)

    useEffect(() => {
        const fetchUserPosts = async () => {
            const response = await fetch(`${url}/api/posts/getuserposts/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'applications/json'
                }
            })
            const data = await response.json()
            setPosts(data)
            setPostsLoaded(true)
        }
        fetchUserPosts()
    }, [username])

    return (
        <div hidden={activeTab !== 0}>
            {
                postsLoaded
                    ?
                    posts.map((post, index) => {
                        return < PostCard post={post} key={index} />
                    })
                    :
                    <div>Loading...</div>
            }
        </div>
    )
}

export default PostsTab