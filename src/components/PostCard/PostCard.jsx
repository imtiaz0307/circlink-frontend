import './PostCard.css'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { useState, useContext } from 'react'
import { AppContext } from '../../AppState/AppContext'
import { useEffect } from 'react'
import DeletePostModal from '../DeletePostModal/DeletePostModal'
import { useRef } from 'react'
import PostEditModal from '../PostEditModal/PostEditModal'


const PostCard = ({ post, isCurrentUser }) => {
    const postRef = useRef(null)
    const { currentUser, url, getUserById } = useContext(AppContext)
    const [showPostMenu, setShowPostMenu] = useState(false)
    const [postLiked, setPostLiked] = useState(post.likes.includes(currentUser._id))
    const [postLikes, setPostLikes] = useState(post.likes.length)
    const [showFullText, setShowFullText] = useState(false)
    const [postUser, setPostUser] = useState('')
    const [isUserReady, setIsUserReady] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    // cover ms in days
    const dateInDays = (date) => {
        const days = Math.abs((new Date().getTime() - new Date(date).getTime()) / 3600000 / 24)
        if (days < 1) {
            const hours = days * 24
            if (hours < 1) {
                const minutes = hours * 60
                if (minutes < 1) {
                    return 'a few seconds'
                }
                else {
                    return `${Math.round(minutes)} minutes`
                }
            }
            else {
                return `${Math.round(hours)} hours`
            }
        }
        else {
            return `${Math.round(days)} days`
        }
    }

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

    // getting post user
    useEffect(() => {
        const getUser = async () => {
            const user = await getUserById(post.userid)
            setPostUser(user)
            setIsUserReady(true)
        }
        getUser()
    }, [])

    return (
        <div className="post" ref={postRef} onClick={() => setShowPostMenu(false)}>
            {
                isUserReady
                    ?
                    <>
                        <div className="postTop">
                            <div className="userImageAndName">

                                <Link to={`/users/${postUser.userName}`}>
                                    <img src={postUser.profilePicture || '/Default_pfp.jpg'} alt={postUser.name} />
                                </Link>

                                <div className="postUserAndDate">
                                    <h3><Link to={`/users/${postUser.userName}`}>{postUser.name}</Link></h3>
                                    <p>{dateInDays(post.createdAt)} ago</p>
                                </div>

                            </div>
                            {
                                isCurrentUser
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
                                            <li><AiOutlineEdit /> Edit Post</li>
                                            <li onClick={() => setShowDeleteModal(true)}><AiOutlineDelete /> Delete Post</li>
                                        </ul>
                                    }
                                </div>
                            }
                        </div>

                        <div className="postContent">
                            {
                                post.caption.length > 175
                                    ?
                                    <p className="postText" style={{
                                        fontSize: post.file ? '.9rem' : '1.5rem',
                                        fontWeight: post.file ? '400' : '600',
                                        padding: '0 .2rem'
                                    }}>{showFullText ? post.caption : post.caption.slice(0, 175) + '....'} <span onClick={() => setShowFullText(!showFullText)}>{showFullText ? 'show less' : 'read more'}</span></p>
                                    :
                                    <p className="postText" style={{
                                        fontSize: post.file ? '.9rem' : '1.5rem',
                                        fontWeight: post.file ? '400' : '600',
                                        padding: '0 .2rem'
                                    }}>
                                        {post.caption}
                                    </p>
                            }
                            {
                                post.file
                                &&
                                <div className="postImgContainer">
                                    <img src={post.file} />
                                </div>
                            }
                        </div>
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
                                        post.comments?.length > 0
                                        &&
                                        <p className="postCommentsCount">
                                            <span>{post.comments.length} comments</span>
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
                    </>
                    :
                    'loading'
            }
            {
                showDeleteModal
                &&
                <DeletePostModal postCard={postRef.current} ssdm={setShowDeleteModal} postid={post._id} url={url} />
            }
            {
                showEditModal
                &&
                <PostEditModal post={post} url={url} ssem={setShowEditModal} />
            }
        </div >
    )
}

export default PostCard;