import Vue from 'vue'
import Vuex from 'vuex'
import apiTools from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user:{
      id: '',
      name: ''
    },
    orders: []
  },
  getters: {
    getVuexOrders: state => state.orders,
  },
  mutations: {
    setLoginState: function(state, obj) {
      state.isLogin = obj.isLogin
      state.user.id = obj.id
      state.user.name = obj.name
    },
    setOrders: function(state, obj) {
      state.orders = obj
    }
  },
  actions: {
    login(context, params) { // 登入
      return new Promise((resolve, reject) => {
          apiTools.login(params).then(res => {
              resolve(res)
          }).catch(err => {
              reject(err)
          })
      })
    },
    loginState(context, params) {
      params.isLogin = true
      context.commit('setLoginState', params)
      sessionStorage.setItem('accountState', encodeURIComponent(JSON.stringify({ isLogin: true, data: {id: params, name: params.name} }), 'utf-8'))
    },
    setLoginState(context, params) {
        context.commit('setLoginState', params)
    },
    logout(context) {
      context.state.isLogin = false
      context.state.user = {}
      sessionStorage.removeItem('accountState') 
    },
    getOrders(context) {
      return new Promise((resolve, reject) => {
        apiTools.getOrders().then(res => {
          context.commit('setOrders', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    cancelOrder(context, cancelIDs) {
      return new Promise((resolve) => {
          let data = context.state.orders          
          data.forEach( (item) => {
            if(cancelIDs.indexOf(item.id) >=0){
              item.status.code = 3
              item.status.type = '已取消'
            }
          })
          context.commit('setOrders', data)
          sessionStorage.setItem('orders', encodeURIComponent(JSON.stringify(data), 'utf-8'))
          resolve({error: 0})
      })
    },
    addOrders(context, data) {
      return new Promise((resolve) => {
        let orders = context.state.orders
        let maxID = 1
        orders.forEach( (item) =>{
          if(item.id >= maxID){
            maxID = item.id
          }
        })
        // 整形
        let Today = new Date();
        let date = (Today.getFullYear() - 1911)+ "/" + (Today.getMonth()+1) + "/" + Today.getDate()
        let operationData = data.map( (item) => {
          maxID++
          let o = {
            id: maxID,
            name: item.name,
            logo: item.logo,
            date: date,
            status:{
              code: 0,
              type: ''
            }
          }
          let code = parseInt(item.code)
          switch (code) {
            case 1:
              o.status.code = code
              o.status.type = '處理中'
              break;
            case 2:
              o.status.code = code
              o.status.type = '已成立'
              break;
            case 3:
              o.status.code = code
              o.status.type = '已取消'
              break;
            case 4:
              o.status.code = code
              o.status.type = '已送達'
              break;
          }          
          return o
        })
        orders.push(...operationData)
        context.commit('setOrders', orders)
        sessionStorage.setItem('orders', encodeURIComponent(JSON.stringify(orders), 'utf-8'))
        resolve({error: 0})
      })
    }
  },
  modules: {
  }
})
