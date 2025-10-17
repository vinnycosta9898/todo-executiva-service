import { createContext } from 'react'

export type UserProps = {
  id: string
  name: string
  email: string
}

export type SignInProps = {
  email: string
  password: string
}

export type SignUpProps = {
  name: string
  email: string
  password: string
}

export type AuthContextData = {
  user: UserProps | undefined
  userId: string | null
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credentials: SignUpProps) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)
