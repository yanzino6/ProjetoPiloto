import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/login/Login.jsx'
import App from './pages/login/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
