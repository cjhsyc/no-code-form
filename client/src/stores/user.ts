import type { UserData } from '@/types'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('userStore', () => {
  const id = useStorage('userId', 0, sessionStorage)
  const username = useStorage('username', '', sessionStorage)
  const role = useStorage('role', '', sessionStorage)
  const avatar = useStorage('avatar', '', sessionStorage)

  const setUserData = (userData: UserData) => {
    id.value = userData.id
    username.value = userData.username
    role.value = userData.role
    avatar.value = userData.avatar
  }

  const signOut = () => {
    id.value = 0
    username.value = ''
    role.value = ''
    avatar.value = ''
  }

  return {
    id,
    username,
    role,
    avatar,
    setUserData,
    signOut
  }
})
