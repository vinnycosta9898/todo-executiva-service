import axios, { type AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import { signOutHelper } from '../utils/signoutHelper'

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@todo-service']}`
    }
  })

  api.interceptors.response.use(
    response => response,
    (err: AxiosError) => {
      if (err.response?.status === 401) {
        if (typeof window !== 'undefined') {
          signOutHelper()
          window.location.href = '/signin'
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      return Promise.reject(err)
    }
  )

  return api
}
