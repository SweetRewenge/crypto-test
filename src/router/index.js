import Vue from 'vue'
import VueRouter from 'vue-router'

import Markets from '../views/Markets'
import Exchanges from '../views/Exchanges'
import ExchangeView from '../views/ExchangeView'

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
    path: '/exchanges/:id',
    name: 'exchange',
    component: ExchangeView
  },
  {
    path: '/markets',
    name: 'markets',
    component: Markets
  },
  {
    path: '/markets/:id',
    name: 'market',
    component: ExchangeView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
