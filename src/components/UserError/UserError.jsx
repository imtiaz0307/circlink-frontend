import './UserError.css'

const UserError = () => {
    return (
        <div className='noUserError'>
            <img src="/no_user.png" alt="No User" />
            <h3>You may have entered wrong username.</h3>
            <p>Try changing the username, or come back later.</p>
        </div>
    )
}

export default UserError