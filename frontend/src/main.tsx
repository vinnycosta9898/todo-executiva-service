import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth-provider'
import { RoutesApp } from './routes'
import { Toaster } from 'sonner'
import './index.css' // ou './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
        <Toaster richColors />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
