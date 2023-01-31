import './AddCommentForm.css'
import { AiOutlineSend } from 'react-icons/ai'
import { useContext, useRef } from 'react'
import { AppContext } from '../../AppState/AppContext'
import { useNavigate } from 'react-router-dom'

const AddCommentForm = ({ pcc, spcc, postid }) => {
    const { url } = useContext(AppContext)
    const comment = useRef(null)
    const navigate = useNavigate()

    const addCommentHandler = async (e) => {
        e.preventDefault()
        if (!comment.current.value) return;
        const response = await fetch(`${url}/api/posts/${postid}/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ content: comment.current.value })
        })
        const data = await response.json()

        if (data.success) {
            comment.current.value = '';
            spcc(pcc + 1)
            navigate(`/posts/${[postid]}`)

        }
        if (data.error) {
            alert('Something went wrong.')
        }
    }

    return (
        <form className="addCommentForm" onSubmit={addCommentHandler}>
            <input type="text" placeholder="Add your comment" ref={comment} />
            <button type="submit"><AiOutlineSend /></button>
        </form>
    )
}

export default AddCommentForm;