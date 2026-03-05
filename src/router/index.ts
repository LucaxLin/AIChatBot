// 导入由 unplugin-vue-router 自动生成的路由
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

// 你可以在这里定义静态路由，例如登录页、404页等
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    // 通配符路由，必须放在所有路由的最后
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'), // 指向你的 404 页面组件
    meta: { title: '页面未找到' }
  }
]
const router = createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes: [...staticRoutes, ...routes]
})

export default router
