import { useNavigate } from "react-router-dom"

const Home = (isLoggedIn) => {
    const navigate = useNavigate()
    navigate('/signup')
    return (
        <div>
            Hello
        </div>
    )
}

export default Home