import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppState from './AppState/AppState'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <AppState>
      <App />
    </AppState>
  </Router>
)
