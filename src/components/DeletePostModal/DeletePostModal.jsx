import './DeletePostModal.css'

const DeletePostModal = ({ ssdm, postid, url, postCard }) => {
    return (
        <div className="dpmw">
            <div className='deletePostModal'>
                <p>Are you sure you want to delete this post?</p>
                <div className="buttons">
                    <button onClick={async () => {
                        const response = await fetch(`${url}/api/posts/${postid}/delete`, {
                            method: 'Delete',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': localStorage.getItem('auth-token')
                            }
                        })
                        const data = await response.json()
                        if (data.success) {
                            ssdm(false)
                            postCard.remove()
                        }
                    }}>Delete</button>
                    <button onClick={() => ssdm(false)} >Cancel</button>
                </div>
            </div >
        </div>
    )
}

export default DeletePostModal