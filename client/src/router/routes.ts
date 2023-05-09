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
      },
      {
        path: 'data',
        name: 'data',
        component: () => import('@/views/home/Data.vue')
      },
      {
        path: 'template',
        name: 'template',
        component: () => import('@/views/home/Template.vue')
      }
    ]
  },
  {
    path: '/publish/:code',
    name: 'publish',
    component: () => import('@/views/publish/Publish.vue')
  },
  {
    path: '/complete',
    name: 'complete',
    component: () => import('@/views/other/Complete.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/other/NotFound.vue')
  }
]
