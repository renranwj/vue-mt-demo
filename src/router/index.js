import Vue from 'vue'
import VueRouter from 'vue-router'

import Goods from '../views/goods/Goods';
import Ratings from '../views/ratings/Ratings';
import Seller from '../views/seller/Seller';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

export default router
