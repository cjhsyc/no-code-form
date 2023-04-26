export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/designer/:code',
    name: 'designer',
    component: () => import('@/views/designer/Designer.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/home/form',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/home/Form.vue')
      },
      {
        path: 'dict',
        name: 'dict',
        component: () => import('@/views/home/Dict.vue')
      },
      {
        path: 'rule',
        name: 'rule',
        component: () => import('@/views/home/Rule.vue')
      }
    ]
  }
]
