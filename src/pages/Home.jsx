import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../AppState/AppContext"

const Home = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useContext(AppContext)
    useEffect(() => {
        !isAuthenticated && navigate('/signup')
    }, [isAuthenticated])
    return (
        <div>
            Hello
        </div>
    )
}

export default Home