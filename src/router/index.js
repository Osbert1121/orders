import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login.vue'
import err404 from '@/views/404.vue'
import order from '@/views/order.vue'
import query from '@/views/query.vue'
import addorder from '@/views/addorder.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {requiresAuth: false}
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    meta: {requiresAuth: true},
    children: [
      { path: 'query', name: 'query', component: query, meta: { requiresAuth: true } },
      { path: 'addorder', name: 'addorder', component: addorder, meta: { requiresAuth: true } },
    ]
  },
  { path: '/*', name: '404', component: err404 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/ordersys/' : '/',
  routes
})

export default router
