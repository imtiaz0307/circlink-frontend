import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppState/AppContext"
import Navbar from "../components/Navbar/Navbar"

const Home = () => {
    const navigate = useNavigate()
    const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
    useEffect(() => {
        !isAuthenticated && navigate('/login')
    }, [isAuthenticated])
    return (
        <div className="home">
            Home
        </div>
    )
}

export default Home