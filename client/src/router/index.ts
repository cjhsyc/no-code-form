import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/designer'
    },
    {
      path: '/designer',
      name: 'designer',
      component: () => import('../views/designer/Designer.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue')
    }
  ]
})

export default router
