import { useState } from 'react'
import './PostEditModal.css'

const PostEditModal = ({ post, url, ssem }) => {
    const [caption, setCaption] = useState(post.caption)
    const [file, setFile] = useState(post.file)
    return (
        <div className='editModal'>
            <h3>Edit Post</h3>
            <form>
                <textarea value={caption} onChange={(e) => setCaption(e.target.value)}></textarea>
            </form>
        </div>
    )
}

export default PostEditModal