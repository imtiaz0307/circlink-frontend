import { useState } from 'react';
import { useEffect } from 'react';
import './CommentCard.css'
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillLike, AiOutlineDelete, AiOutlineEdit, AiOutlineLike } from 'react-icons/ai';
import DeleteCommentModal from '../DeleteCommentModal/DeleteCommentModal';
import { useRef } from 'react';
import { dateConversion } from '../../Helpers/DateConversion';

const CommentCard = ({ postid, commentid, getUserById, currentUser, url }) => {
    const commentCard = useRef(null)
    const [comment, setComment] = useState('')
    const [commentReady, setCommentReady] = useState(false)
    const [commentLikesCount, setCommentLikesCount] = useState(0)
    const [commentUser, setCommentUser] = useState('')
    const [showCommentMenu, setShowCommentMenu] = useState(false)
    const [commentLiked, setCommentLiked] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [editComment, setEditComment] = useState(false)
    const [editCommentContent, setEditCommentContent] = useState()

    // edit comment handler
    const edtiCommentHandler = async (e) => {
        e.preventDefault()
        const response = await fetch(`${url}/api/posts/${postid}/comments/${commentid}/edit`, {
            method: 'Put',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({ content: editCommentContent })
        })
        const data = await response.json()
        console.log(data)
        if (data.success) {
            setEditComment(false)
        } else {
            alert('something went wrong')
        }
    }


    // like unlike comment handler
    const likeUnlikeCommentHandler = async () => {
        await fetch(`${url}/api/posts/${postid}/comments/${commentid}/react`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
        })

        setCommentLiked(!commentLiked)
        commentLiked ? setCommentLikesCount(commentLikesCount - 1) : setCommentLikesCount(commentLikesCount + 1)
    }

    useEffect(() => {
        const getComment = async () => {
            const response = await fetch(`${url}/api/posts/${postid}/comments/${commentid}`)
            const data = await response.json()
            setComment(data)
            setCommentLikesCount(data.likes.length)
            setEditCommentContent(data.content)
            setCommentLiked(data.likes.includes(currentUser._id))
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
                    <div className='commentCard' ref={commentCard} onClick={() => setShowCommentMenu(false)}>
                        <div className="commentAndUserDetails">
                            <div className="commentTopSection">
                                <Link to={`/users/${commentUser.userName}`}>
                                    <img src={commentUser.profilePicture} alt={commentUser.name} />
                                    <p>{commentUser.name} <span>{dateConversion(comment.createdAt)} ago</span></p>
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
                                                <li onClick={() => setEditComment(true)}><AiOutlineEdit /> Edit</li>
                                                <li onClick={() => setShowDeleteModal(true)}><AiOutlineDelete /> Delete</li>
                                            </ul>
                                        }
                                    </div>
                                }
                            </div>
                            {
                                editComment
                                    ?
                                    <form className="editComment" onSubmit={edtiCommentHandler}>
                                        <input type="text" value={editCommentContent} placeholder='Enter your comment..' onChange={(e) => setEditCommentContent(e.target.value)} />
                                        <button type="submit">Done</button>
                                    </form>
                                    :
                                    <div className="commentContent">
                                        <p>{editCommentContent}</p>
                                    </div>
                            }
                        </div>
                        <div className="likesCountAndLikeButton">
                            <p className="likesCount">{commentLikesCount > 0 ? `${commentLikesCount} likes` : ''}</p>
                            <button className="commentLikeButton" onClick={likeUnlikeCommentHandler}>
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
                        {
                            showDeleteModal
                            &&
                            <DeleteCommentModal ssdm={setShowDeleteModal} postid={postid} commentid={comment._id} url={url} commentCard={commentCard.current} />
                        }
                    </div>
                    :
                    'loading'
            }
        </>
    )
}

export default CommentCard;