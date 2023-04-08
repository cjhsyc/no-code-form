import { defineStore } from 'pinia'
import type { UserData } from '@/types'

export const useUserStore = defineStore('userStore', () => {
  const id = ref(0)
  const username = ref('')
  const role = ref('')
  const avatar = ref('')

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
