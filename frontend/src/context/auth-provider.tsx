import axios from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import {
  AuthContext,
  type UserProps,
  type SignInProps,
  type SignUpProps
} from './auth-context'
import { signOutHelper } from '../utils/signoutHelper'
import { api } from '../lib/apiClient'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined)
  const [userId, setUserIdState] = useState<string | null>(null)

  useEffect(() => {
    const storedId = localStorage.getItem('@feedback-pro-user-id')
    if (storedId) setUserIdState(storedId)
  }, [])

  const isAuthenticated = !!user?.id
  const navigate = useNavigate()

  function signOut() {
    signOutHelper() // clear cookies and localStorage
    toast.success('Até logo!')
    navigate('/signin')
  }

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/authenticate', {
        email,
        password
      })

      if (response.status === 200) {
        const { id, name, token } = response.data

        setCookie(undefined, '@todo-service', token, {
          maxAge: 60 * 60 * 24, // 1 day
          path: '/'
        })

        localStorage.setItem('@todo-service-user-id', String(id))

        api.defaults.headers.Authorization = `Bearer ${token}`

        setUser({ id, name, email })

        navigate(`/dashboard/${id}`)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 401 || status === 404) {
          toast.warning('E-mail ou senha inválidos')
        } else {
          toast.error('Erro inesperado ao fazer login')
        }
      } else {
        toast.error('Erro desconhecido')
      }
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password
      })

      if (response.status === 201) {
        const { id, token } = response.data

        setCookie(undefined, '@todo-service', token, {
          maxAge: 60 * 60 * 24, // 1 dia
          path: '/'
        })

        api.defaults.headers.Authorization = `Bearer ${token}`

        localStorage.setItem('@todo-service-user-id', id)
        localStorage.setItem('@todo-service-user-email', email)

        setUser({ id, name: response.data.name, email })

        toast.success('Usuário registrado com sucesso')
      }
    } catch {
      toast.error('Erro ao cadastrar usuário')
    }
  }

  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies['@todo-service']
    const userId = String(localStorage.getItem('@todo-service'))

    if (token && userId) {
      api
        .get(`/me?user_id=${userId}`)
        .then(response => {
          const { id, name, email } = response.data
          setUser({ id, name, email })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        isAuthenticated,
        signIn,
        signOut,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
