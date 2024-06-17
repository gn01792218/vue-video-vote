import { createRouter, createWebHistory, RouteRecordRaw ,createWebHashHistory} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/display',
    name: 'Display',
    component:()=>import('@/views/Display.vue')
  },
  {
    path: '/vote',
    name: 'Vote',
    component:()=>import('@/views/Vote.vue')
  },
  {
    path: '/videoControl',
    name: 'VideoControl',
    component:()=>import('@/views/VideoControl.vue')
  },
]

const router = createRouter({
  // history: createWebHistory(),
  history:createWebHashHistory(),
  routes
})
export default router
