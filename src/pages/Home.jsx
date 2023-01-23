import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppState/AppContext"

const Home = () => {
    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
    useEffect(() => {
        !isAuthenticated && navigate('/login')
    }, [isAuthenticated])
    return (
        <div>
            <button onClick={() => {
                localStorage.removeItem('auth-token')
                setIsAuthenticated(false)
            }}>logout</button>
        </div>
    )
}

export default Home