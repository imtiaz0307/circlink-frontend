import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Singup from './pages/Signup'
import { useState } from 'react'
import Home from './pages/Home'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path='/signup' element={<Singup />} />
      </Routes>
    </Router>
  )
}

export default App