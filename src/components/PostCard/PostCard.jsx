import './PostCard.css'
import { Link } from 'react-router-dom'

const PostCard = ({ post }) => {
    const dateInDays = (date) => {
        const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / 3600000 / 24)
        if (days < 0) {
            return days / 60
        }
        return `${days} days`
    }

    return (
        <div className="post">
            <div className="postTop">
                <img src={post.user.profilePicture} alt={post.user.name} />
                <div className="postUserAndDate">
                    <h3><Link to={`/users/${post.user.userName}`}>{post.user.name}</Link></h3>
                    <p>{dateInDays(post.createdAt)} ago</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard;