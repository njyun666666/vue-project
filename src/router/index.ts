import { useLoginStore } from '@/stores/login'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      beforeEnter: () => {
        const login = useLoginStore()
        if (!login.loginState) return '/login'
      },
      children: [
        {
          path: '/',
          name: 'bashboard',
          component: () => import('@/pages/Dashboard/DashboardPage.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/pages/AboutView.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/LoginPage.vue')
    }
  ]
})

export default router
