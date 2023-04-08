import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', () => {
  const search = ref('')

  return {
    search
  }
})
