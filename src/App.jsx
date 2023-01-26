import './App.css'
import { Routes, Route } from 'react-router-dom'
import Singup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar'
import { useContext } from 'react'
import { AppContext } from './AppState/AppContext'
import Profile from './pages/Profile'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const App = () => {
  const { setShowProfileMenu } = useContext(AppContext)
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AppContext)
  useEffect(() => {
    !isAuthenticated && navigate('/login')
  }, [isAuthenticated])
  return (
    <div className='App' onClick={() => {
      setShowProfileMenu(false)
    }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/users/:username' element={<Profile />} />
        <Route path='*' element={<span>Something went wrong.</span>} />
      </Routes>
    </div>
  )
}

export default App