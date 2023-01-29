import { useState } from 'react';
import { useEffect } from 'react';
import './CommentCard.css'
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillLike, AiOutlineDelete, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai';

const CommentCard = ({ postid, commentid, getUserById, currentUser, url }) => {
    const [comment, setComment] = useState('')
    const [commentReady, setCommentReady] = useState(false)
    const [commentLikesCount, setCommentLikesCount] = useState(0)
    const [commentUser, setCommentUser] = useState('')
    const [showCommentMenu, setShowCommentMenu] = useState(false)
    const [commentLiked, setCommentLiked] = useState(comment.likes?.includes(currentUser._id))

    useEffect(() => {
        const getComment = async () => {
            const response = await fetch(`${url}/api/posts/${postid}/comments/${commentid}`)
            const data = await response.json()
            setComment(data)
            setCommentLikesCount(data.likes)
            const comUser = await getUserById(data.userid)
            setCommentUser(comUser)
            setCommentReady(true)
        }
        getComment()
    }, [])
    return (
        <>
            {
                commentReady
                    ?
                    <div className='commentCard' onClick={() => setShowCommentMenu(false)}>
                        <div className="commentAndUserDetails">
                            <div className="commentTopSection">
                                <Link to={`/users/${commentUser.userName}`}>
                                    <img src={commentUser.profilePicture} alt={commentUser.name} />
                                    <p>{commentUser.name}</p>
                                </Link>
                                {
                                    commentUser._id === currentUser._id &&
                                    <div className="commentMenuContainer">
                                        <BsThreeDots cursor={'pointer'} onClick={(e) => {
                                            e.stopPropagation()
                                            setShowCommentMenu(true)
                                        }} />
                                        {
                                            showCommentMenu
                                            &&
                                            <ul className="commentMenu">
                                                <li><AiOutlineEdit /> Edit</li>
                                                <li><AiOutlineDelete /> Delete</li>
                                            </ul>
                                        }
                                    </div>
                                }
                            </div>
                            <div className="commentContent">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                        <div className="likesCountAndLikeButton">
                            <p className="likesCount">{commentLikesCount > 0 ? `${commentLikesCount} likes` : ''}</p>
                            <button className="commentLikeButton">
                                {
                                    commentLiked
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
                        </div>
                    </div>
                    :
                    'loading'
            }
        </>
    )
}

export default CommentCard;