import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LinkProvider } from './context/LinkContext.jsx'
import { UserProvider } from './context/userContext.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LinkProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </LinkProvider>
  </StrictMode>,
)
