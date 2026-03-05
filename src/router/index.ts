// 导入由 unplugin-vue-router 自动生成的路由
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

// 你可以在这里定义静态路由，例如登录页、404页等
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  }
]
const router = createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes: [...staticRoutes, ...routes]
})

export default router
