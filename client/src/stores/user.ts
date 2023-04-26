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

  return {
    id,
    username,
    role,
    avatar,
    setUserData
  }
})
