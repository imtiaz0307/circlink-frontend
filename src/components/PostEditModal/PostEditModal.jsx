import { useState, useContext } from 'react'
import './PostEditModal.css'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { HiXMark } from 'react-icons/hi2'
import { AppContext } from '../../AppState/AppContext'

const PostEditModal = ({ post, url, ssem }) => {
    const [caption, setCaption] = useState(post.caption)
    const [file, setFile] = useState(post.file)
    const { setAutoRefresher } = useContext(AppContext)

    // edit post handler
    const editPostHandler = async (e) => {
        e.preventDefault()

        await fetch(`${url}/api/posts/${post._id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ caption, file })
        })

        setAutoRefresher(prev => prev + 1)
        ssem(false)
    }

    return (
        <div className="editModalWrapper">
            <div className='editModal'>
                <h3>Edit Post</h3>
                <form>
                    <div className="editPostTextContainer">
                        <label htmlFor="editPostCaption">Description:</label>
                        <textarea value={caption} onChange={(e) => setCaption(e.target.value)} id='editPostCaption' />
                    </div>
                    <p>Current Image:</p>
                    {
                        file
                        &&
                        <div className="editModalPreview">
                            <p className="xmark" onClick={() => {
                                setFile('')
                                setFile('')
                            }}>
                                <HiXMark />
                            </p>
                            <img src={file} alt='preview' />
                        </div>
                    }
                    <div className="editPostFileContainer">
                        <label htmlFor="editPostFile">
                            <AiOutlineCloudUpload />
                            <p>Upload New Image</p>
                        </label>
                        <input type="file" multiple={false} id="editPostFile" onChange={(e) => {
                            const newFile = new FileReader()
                            newFile.readAsDataURL(e.target.files[0])
                            newFile.onloadend = () => setFile(newFile.result)
                        }} hidden />
                    </div>
                    <div className="buttons">
                        <button type='button' onClick={() => ssem(false)}>Cancel</button>
                        <button type='submit' disabled={!file && !caption} onClick={editPostHandler}>Submit Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostEditModal