import { Route, Routes } from 'react-router-dom'
import App from './App'
import { SignIn } from './pages/signin'
import { Home } from './pages/home'

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home/:userId" element={<Home />} />
    </Routes>
  )
}
