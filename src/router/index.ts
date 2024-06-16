import { createRouter, createWebHistory, RouteRecordRaw ,createWebHashHistory} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/display',
    name: 'Display',
    component:()=>import('@/views/Display.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  // history:createWebHashHistory(),
  routes
})
export default router
