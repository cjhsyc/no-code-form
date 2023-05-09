import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, form) => {
  const userStore = useUserStore()
  if (
    to.path !== '/login' &&
    to.name !== 'publish' &&
    to.name !== 'notFound' &&
    !(form.name === 'publish' && to.name === 'complete') &&
    userStore.role === ''
  ) {
    return '/login'
  }
  if (to.path === '/login' && userStore.role !== '') {
    return '/home'
  }
})

export default router
