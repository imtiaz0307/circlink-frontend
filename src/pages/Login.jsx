import './styles/Login.css'
import { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../AppState/AppContext'

const Login = () => {
    // constants
    const navigate = useNavigate()

    // app context
    const { url, isAuthenticated, setIsAuthenticated } = useContext(AppContext)

    // states
    const [isError, setIsError] = useState(false)
    const [loginWIthUserName, setLoginWIthUserName] = useState(true)

    // references
    const loginUsername = useRef(null)
    const loginEmail = useRef(null)
    const loginPassword = useRef(null)


    // login handler
    const loginHandler = async (e) => {
        e.preventDefault();
        let data;
        if (loginWIthUserName) {

            const response = await fetch(`${url}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: loginUsername.current.value,
                    password: loginPassword.current.value
                })
            })
            data = await response.json()
        } else {
            const response = await fetch(`${url}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginEmail.current.value,
                    password: loginPassword.current.value
                })
            })
            data = await response.json()
        }
        // if any of the credential is wrong
        if (data.error) {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 2000);
        }
        // if login successfully
        if (data.token) {
            localStorage.setItem('auth-token', data.token)
            setIsAuthenticated(true)
            navigate('/')
        }
    }

    // navigating to homepage if already logged in
    useEffect(() => {
        isAuthenticated && navigate('/')
    }, [])

    return (
        <div className="login">
            <div className="loginWrapper" onSubmit={loginHandler}>
                <h2>Login To Your Account!</h2>
                <form>
                    {
                        loginWIthUserName
                            ?
                            <div className="inputField">
                                <label htmlFor="userName">Enter Your Username</label>
                                <input type="text" id='userName' placeholder='Enter your username' required minLength={4} ref={loginUsername} />
                                <p className="switchLogin" onClick={() => setLoginWIthUserName(false)}>Login with email instead.</p>
                            </div>
                            :
                            <div className="inputField">
                                <label htmlFor="firstName">Enter Your Email Address</label>
                                <input type="email" id='email' placeholder='Enter your email address' required ref={loginEmail} />
                                <p className="switchLogin" onClick={() => setLoginWIthUserName(true)}>Login with username instead.</p>
                            </div>
                    }
                    <div className="inputField">
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" id='password' placeholder='Enter your password' required minLength={8} ref={loginPassword} />
                    </div>
                    {
                        isError && (
                            <div className="loginError">Invalid Credentials.</div>
                        )
                    }
                    <button type='submit' className='btn'>Login</button>
                </form>
                <h6>
                    <Link to='/signup'>Don't have an account?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login