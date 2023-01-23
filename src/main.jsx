import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppState from './AppState/AppState'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppState>
    <App />
  </AppState>
)
