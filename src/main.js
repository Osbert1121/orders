import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'vue-axios'
import 'view-design/dist/styles/iview.css'
import iView from 'view-design'
import { sync } from 'vuex-router-sync'
import { jsFn } from '@/utils/js-fn'

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$http', { value: axios })

Vue.use(iView)

sync(store, router)

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (!jsFn.isEmpty(sessionStorage.getItem('accountState'))) {
  let data = JSON.parse(decodeURIComponent(sessionStorage.getItem('accountState'), 'utf-8'))
  store.dispatch('setLoginState', data)
}

// 登錄中間驗證，頁面需要登錄而沒有登錄的情況直接跳轉登錄
router.beforeEach((to, from, next) => {
  // console.log('to=', to.fullPath, '| from=', from.fullPath)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLogin) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else if (store.state.isLogin) {
    next({ name: 'order' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
