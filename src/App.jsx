import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Singup from './pages/Signup'
import Home from './pages/Home'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Singup />} />
      </Routes>
    </Router>
  )
}

export default App