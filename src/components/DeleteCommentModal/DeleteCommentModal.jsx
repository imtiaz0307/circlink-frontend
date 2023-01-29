import './DeleteCommentModal.css'

const DeleteCommentModal = ({ ssdm, postid, commentid, url, commentCard }) => {
    return (
        <div className="dpmw">
            <div className='deletePostModal'>
                <p>Are you sure you want to delete this post?</p>
                <div className="buttons">
                    <button onClick={async () => {
                        const response = await fetch(`${url}/api/posts/${postid}/comments/${commentid}/delete`, {
                            method: 'Delete',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': localStorage.getItem('auth-token')
                            }
                        })
                        const data = await response.json()
                        console.log(data)
                        if (data.success) {
                            ssdm(false)
                            commentCard.remove()
                        }
                    }}>Delete</button>
                    <button onClick={() => ssdm(false)} >Cancel</button>
                </div>
            </div >
        </div>
    )
}

export default DeleteCommentModal