import Vue from 'vue'
import VueRouter from 'vue-router'

import Markets from '../views/Markets.vue'
import Exchanges from '../views/Exchanges.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/exchanges'
  },
  {
    path: '/exchanges',
    name: 'exchanges',
    component: Exchanges
  },
  {
    path: '/markets',
    name: 'markets',
    component: Markets
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
