import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Singup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar'
import { useContext } from 'react'
import { AppContext } from './AppState/AppContext'

const App = () => {
  const { showProfileMenu, setShowProfileMenu } = useContext(AppContext)
  return (
    <div className='App' onClick={() => setShowProfileMenu(false)}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Singup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App