import { useRef } from 'react'
import './AddPost.css'
import { FcCamera } from 'react-icons/fc'
import { HiXMark } from 'react-icons/hi2'
import { useContext } from 'react'
import { AppContext } from '../../AppState/AppContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddPost = ({ setAutoRefresher, autoRefresher }) => {
    const caption = useRef(null)
    const file = useRef(null)
    const { url, currentUser } = useContext(AppContext)
    const [preview, setPreview] = useState('')
    const [clickable, setClickable] = useState(0)
    const navigate = useNavigate()
    const addPostButton = useRef(null)

    // addpost
    const addPostHandler = async (e) => {
        e.preventDefault();
        if (!file.current.value && !caption.current.value) return;
        const currentFile = file.current.files[0] || ''
        if (!currentFile && currentFile.size > 2048000) {
            alert('File size exceeding the limit')
        }
        else {
            if (!currentFile) {

                addPostButton.current.innerText = 'Posting'

                await fetch(`${url}/api/posts/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    body: JSON.stringify({ caption: caption.current.value, file: '' })
                })

                setAutoRefresher(autoRefresher + 1)
                file.current.value = caption.current.value = ''
                setPreview('')
                addPostButton.current.innerText = 'Post'
                navigate(`/users/${currentUser.userName}`)
            } else {

                addPostButton.current.innerText = 'Posting'

                const reader = new FileReader()
                reader.readAsDataURL(currentFile)
                reader.onloadend = async () => {
                    setPreview(reader.result)

                    await fetch(`${url}/api/posts/create`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': localStorage.getItem('auth-token')
                        },
                        body: JSON.stringify({ caption: caption.current.value, file: reader.result })
                    })

                    setAutoRefresher(autoRefresher + 1)
                    file.current.value = caption.current.value = ''
                    setPreview('')
                    addPostButton.current.innerText = 'Post'
                    navigate(`/users/${currentUser.userName}`)
                }
            }
        }
    }


    return (
        <div className='addPost'>
            <form onSubmit={addPostHandler}>
                <h3>Add Post</h3>
                <textarea ref={caption} placeholder={`What's on your minds?`} onChange={(e) => {
                    setClickable(prev => prev + e.target.value.length)
                    if (e.target.value == '') setClickable(0)
                }} />
                {
                    preview
                    &&
                    <div className="photoPreview">
                        <p className="xmark" onClick={() => {
                            file.current.value = ''
                            setClickable(0)
                            setPreview('')
                        }}>
                            <HiXMark />
                        </p>
                        <img src={preview} alt="preview" />
                    </div>
                }
                <div className="apfBottom">
                    <label htmlFor="apFile"><FcCamera fontSize={'1.2rem'} /> Upload Image</label>
                    <input type="file" id='apFile' hidden ref={file} onChange={(e) => {
                        const reader = new FileReader()
                        reader.readAsDataURL(e.target.files[0])
                        reader.onloadend = async () => {
                            setPreview(reader.result)
                        }
                        setClickable(prev => prev + e.target.value.length)
                    }} />
                    <button type="submit" disabled={!clickable} ref={addPostButton}>Post</button>
                </div>
            </form>
        </div>
    )
}

export default AddPost