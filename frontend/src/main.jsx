import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { UserProvider } from './context/userContext'
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='1096613193556-u2namuri2v5n04qsioated61vuoh07p6.apps.googleusercontent.com'>
    <UserProvider>
    <App />
    <Toaster />
    </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
