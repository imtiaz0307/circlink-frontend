import './PostCard.css'
import { Link } from 'react-router-dom'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineLike, AiFillLike, AiOutlineShareAlt, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { useState, useContext } from 'react'
import { AppContext } from '../../AppState/AppContext'

const PostCard = ({ post, isCurrentUser }) => {
    const { currentUser, url } = useContext(AppContext)
    const [showPostMenu, setShowPostMenu] = useState(false)
    const [postLiked, setPostLiked] = useState(post.likes.includes(currentUser._id))
    const [postLikes, setPostLikes] = useState(post.likes.length)
    const [showFullText, setShowFullText] = useState(false)

    // cover ms in days
    const dateInDays = (date) => {
        const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / 3600000 / 24)
        if (days < 0) {
            return days / 60
        }
        return `${days} days`
    }

    // like unlike post handler
    const likeUnlikePostHandler = async () => {
        const response = await fetch(`${url}/api/posts/${post._id}/react`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        setPostLiked(!postLiked)
        postLiked ? setPostLikes(postLikes - 1) : setPostLikes(postLikes + 1)
    }

    return (
        <div className="post" onClick={() => setShowPostMenu(false)}>
            {/* post top */}
            <div className="postTop">
                <div className="userImageAndName">
                    <Link to={`/users/${post.user.userName}`}>
                        <img src={post.user.profilePicture || '/Default_pfp.jpg'} alt={post.user.name} />
                    </Link>
                    <div className="postUserAndDate">
                        <h3><Link to={`/users/${post.user.userName}`}>{post.user.name}</Link></h3>
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
                                <li><AiOutlineDelete /> Delete Post</li>
                            </ul>
                        }
                    </div>
                }
            </div>

            {/* Post content */}
            <div className="postContent">
                {
                    post.caption.length > 175
                        ?
                        <p className="postText" style={{
                            fontSize: post.file ? '1rem' : '2rem',
                            fontWeight: post.file ? '400' : '600',
                            padding: '0 .2rem'
                        }}>{showFullText ? post.caption : post.caption.slice(0, 175) + '....'} <span onClick={() => setShowFullText(!showFullText)}>{showFullText ? 'show less' : 'read more'}</span></p>
                        :
                        <p className="postText" style={{
                            fontSize: post.file ? '1rem' : '2rem',
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
            {/* post actions */}
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
        </div >
    )
}

export default PostCard;