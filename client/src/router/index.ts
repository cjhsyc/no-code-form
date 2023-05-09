import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (to.path !== '/login' && to.name !== 'publish' && to.name !== 'notFound' && userStore.role === '') {
    return '/login'
  }
  if(to.path === '/login' && userStore.role !== '') {
    return '/home'
  }
})

export default router
