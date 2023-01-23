import './styles/Signup.css'
import { useRef, useState, useContext } from 'react'
import { AppContext } from '../AppState/AppContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

const Signup = () => {
    // constants
    const navigate = useNavigate()

    // app context
    const { url, isAuthenticated, setIsAuthenticated } = useContext(AppContext)

    // states
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)

    // references
    const signUpFirstName = useRef(null)
    const signUpLastName = useRef(null)
    const signUpemail = useRef(null)
    const signUpUsername = useRef(null)
    const signUpPassword = useRef(null)
    const signUpConfirmPassword = useRef(null)
    const signUpDate = useRef(null)
    const signUpGenderMale = useRef(null)
    const signUpGenderFemale = useRef(null)

    // handlers
    const signUpHandler = async (e) => {
        e.preventDefault()
        if (signUpPassword.current.value !== signUpConfirmPassword.current.value) {
            setPasswordError(true)
            setTimeout(() => {
                setPasswordError(false)
            }, 2000);
        }
        else {
            const response = await fetch(`${url}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${signUpFirstName.current.value} ${signUpLastName.current.value}`,
                    email: signUpemail.current.value,
                    userName: signUpUsername.current.value,
                    password: signUpPassword.current.value,
                    dateOfBirth: signUpDate.current.value,
                    gender: signUpGenderMale.current.id || signUpGenderFemale.current.id
                })
            })
            const data = await response.json();
            // if email is already used
            if (data.error?.includes('Email')) {
                setEmailError(true)
                setTimeout(() => {
                    setEmailError(false)
                }, 2000);
            }
            // if username is taken
            if (data.error?.includes('Username')) {
                setUserNameError(true)
                setTimeout(() => {
                    setUserNameError(false)
                }, 2000);
            }
            // if successfully signed up
            if (data.token) {
                localStorage.setItem('auth-token', data.token)
                setIsAuthenticated(true)
                navigate('/')
            }
        }
    }

    // navigating to homepage if already logged in
    useEffect(() => {
        isAuthenticated && navigate('/')
    }, [])

    return (
        <div className='signup'>
            <div className="signUpWrapper">
                <h2>Create An Account!</h2>
                <form onSubmit={signUpHandler}>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="firstName">First Name <span>*</span></label>
                            <input type="text" id='firstName' placeholder='Enter your first name' required minLength={6} ref={signUpFirstName} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' placeholder='Enter your last name' ref={signUpLastName} />
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="userName">Username <span>*</span></label>
                            <input type="text" id='userName' placeholder='Enter your username' required minLength={4} ref={signUpUsername} />
                            <div className="error" style={{ opacity: `${userNameError ? 1 : 0}` }}>Username taken.</div>
                        </div>
                        <div className="inputField">
                            <label htmlFor="firstName">Email Address <span>*</span></label>
                            <input type="email" id='email' placeholder='Enter your email address' required ref={signUpemail} />
                            <div className="error" style={{ opacity: `${emailError ? 1 : 0}` }}>Email already exists.</div>
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="password" id='password' placeholder='Enter your password' required minLength={8} ref={signUpPassword} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                            <input type="password" id='confirmPassword' placeholder='Re-enter your username' required minLength={8} ref={signUpConfirmPassword} />
                            <div className="error" style={{ opacity: `${passwordError ? 1 : 0}` }}>Password Doesn't match.</div>
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <input type="date" id='dateOfBirth' ref={signUpDate} />
                        </div>
                        <div className="inputField genderSelection">
                            <label>Gender</label>
                            <div className="genderOptions">
                                <div className="genderOption">
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" id='male' name='gender' ref={signUpGenderMale} />
                                </div>
                                <div className="genderOption">
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" id='female' name='gender' ref={signUpGenderFemale} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn'>Sign Up</button>
                </form>
                <h6>
                    <Link to='/login'>Already have an account?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup