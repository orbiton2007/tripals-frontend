import Vue from 'vue'
import Vuex from 'vuex'
import TripStore from './modules/TripStore.js'
import UserStore from './modules/UserStore.js'
import CountryStore from './modules/CountryStore.js'
import SocketStore from './modules/SocketStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {

  },
  actions: {
  
  },
  modules: {
    TripStore,
    UserStore,
    CountryStore,
    SocketStore
  }
})
