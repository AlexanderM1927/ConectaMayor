import { defineRouter } from '#q-app/wrappers'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

export default defineRouter(() =>
  createRouter({
    routes,
    history: createWebHashHistory(process.env.VUE_ROUTER_BASE),
    scrollBehavior: () => ({ top: 0, left: 0 })
  })
)
