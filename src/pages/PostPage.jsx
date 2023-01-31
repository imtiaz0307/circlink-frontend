import './styles/PostPage.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../AppState/AppContext'
import { useState } from 'react'
import { dateConversion } from '../Helpers/DateConversion'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillLike, AiOutlineDelete, AiOutlineEdit, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import CommentCard from '../components/CommentCard/CommentCard'
import PostEditModal from '../components/PostEditModal/PostEditModal'
import DeletePostModal from '../components/DeletePostModal/DeletePostModal'

const PostPage = () => {
    const { postid } = useParams()
    const navigate = useNavigate()
    const { url, currentUser, getUserById } = useContext(AppContext)
    const [post, setPost] = useState('')
    const [postUser, setPostUser] = useState('')
    const [showPostMenu, setShowPostMenu] = useState(false)
    const [postLikes, setPostLikes] = useState('')
    const [postLiked, setPostLiked] = useState('')
    const [postComments, setPostComments] = useState('')
    const [postCommentsCount, setPostCommentsCount] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    // like unlike post handler
    const likeUnlikePostHandler = async () => {
        await fetch(`${url}/api/posts/${post._id}/react`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        setPostLiked(!postLiked)
        postLiked ? setPostLikes(postLikes - 1) : setPostLikes(postLikes + 1)
    }

    // get post
    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`${url}/api/posts/${postid}`)
            const data = await response.json()
            if (data.error) return alert('No Post Found.')
            setPost(data)
            setPostComments(data.comments)

            // getting user
            const userData = await getUserById(data.userid)
            setPostUser(userData)
        }
        getPost()
    }, [post])

    return (
        <div className='postPage' onClick={() => setShowPostMenu(false)}>
            <div className="topGoBack">
                <span onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>&larr;</span>
            </div>
            <div className="postPageBottom">
                {
                    post.file
                    &&
                    <div className="postPageLeft">
                        <img src={post.file} alt={post.caption} />
                    </div>
                }
                <div className="postPageRight">
                    <div className="postRightTop">
                        <Link to={`/users/${postUser.userName}`} className="userDetailsAndTime">
                            <img src={postUser.profilePicture} alt={postUser.name} className="userImg" />
                            <p className="userNameAndTime">
                                <span className='userName'>{postUser.name}</span>
                                <span>{dateConversion(post.createdAt)} ago</span>
                            </p>
                        </Link>
                        {
                            currentUser._id == postUser._id
                            &&
                            <div className="postMenuContainer">
                                <BsThreeDots style={{ cursor: 'pointer' }} onClick={(e) => {
                                    setShowPostMenu(true)
                                    e.stopPropagation()
                                }} fontSize={'1.4rem'} />
                                {
                                    showPostMenu
                                    &&
                                    <ul className="postMenu">
                                        <li onClick={() => setShowEditModal(true)}><AiOutlineEdit /> Edit Post</li>
                                        <li onClick={() => setShowDeleteModal(true)}><AiOutlineDelete /> Delete Post</li>
                                    </ul>
                                }
                            </div>
                        }
                    </div>
                    <h3 className="postPageCaption">{post.caption}</h3>
                    <div className="postActions">
                        {
                            (postLikes > 0 || post.comments?.length > 0)
                            &&
                            <div className="postStats">
                                {
                                    postLikes > 0
                                    &&
                                    <p className="postLikesCount">
                                        <AiOutlineLike style={{
                                            transform: 'translateY(2px)',
                                        }} />
                                        <span>{postLikes} likes</span>
                                    </p>
                                }
                                {
                                    postCommentsCount
                                    &&
                                    <p className="postCommentsCount">
                                        <span>{postCommentsCount} comments</span>
                                    </p>
                                }
                            </div>
                        }
                        <div className="postActionsBottom">
                            <button onClick={likeUnlikePostHandler}>
                                {
                                    postLiked
                                        ?
                                        <>
                                            <AiFillLike /> <span>Liked</span>
                                        </>
                                        :
                                        <>
                                            <AiOutlineLike /> <span>Like</span>
                                        </>
                                }
                            </button>
                            <button><FaRegCommentAlt /> <span>Comment</span></button>
                            <button><AiOutlineShareAlt /> <span>Share</span></button>
                        </div>
                    </div>
                    <div className="postComments">
                        {
                            postComments?.length > 0
                            &&
                            postComments.map((commentid, index) => {
                                return <CommentCard key={index} commentid={commentid} postid={post._id} getUserById={getUserById} currentUser={currentUser} url={url} scc={setPostCommentsCount} />
                            })
                        }
                    </div>
                </div>
            </div>
            {
                showEditModal
                &&
                <PostEditModal post={post} ssem={setShowEditModal} url={url} />
            }
            {
                showDeleteModal
                &&
                <DeletePostModal postid={post._id} ssdm={setShowDeleteModal} url={url} />
            }
        </div>
    )
}

export default PostPage