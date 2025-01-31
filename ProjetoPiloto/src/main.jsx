import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import System from './pages/login/System.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <System />
  </StrictMode>,
)
