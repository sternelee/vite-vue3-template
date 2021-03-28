import {createRouter, createWebHashHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('./views/index.vue'),
    children: [
      {
        path: '/login',
        component: () => import('./views/login/index.vue')
      },
    ]
  }
]

var router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router