import './styles/Signup.css'

const Signup = () => {
    return (
        <div className='signup'>
            <div className="signUpWrapper">
                <h2>Create An Account!</h2>
                <form>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="firstName">First Name <span>*</span></label>
                            <input type="text" id='firstName' placeholder='Enter your first name' required minLength={6} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id='lastName' placeholder='Enter your last name' />
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="firstName">Email Address <span>*</span></label>
                            <input type="email" id='email' placeholder='Enter your email address' required />
                        </div>
                        <div className="inputField">
                            <label htmlFor="userName">Username <span>*</span></label>
                            <input type="text" id='userName' placeholder='Enter your username' required minLength={4} />
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="password" id='password' placeholder='Enter your password' required minLength={8} autoComplete={false} autoCorrect={false} />
                        </div>
                        <div className="inputField">
                            <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                            <input type="password" id='confirmPassword' placeholder='Re-enter your username' required minLength={8} autoComplete={false} autoCorrect={false} />
                        </div>
                    </div>
                    <div className="twoInputs">
                        <div className="inputField">
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <input type="date" id='dateOfBirth' />
                        </div>
                        <div className="inputField genderSelection">
                            <label>Gender</label>
                            <div className="genderOptions">
                                <div className="genderOption">
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" id='male' name='gender' />
                                </div>
                                <div className="genderOption">
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" id='female' name='gender' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='btn'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup