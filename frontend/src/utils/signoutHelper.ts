import { destroyCookie } from 'nookies'

export function signOutHelper() {
  destroyCookie(undefined, '@todo-service')
  localStorage.removeItem('@todo-service-user-id')
  localStorage.removeItem('@todo-service-user-email')
}
