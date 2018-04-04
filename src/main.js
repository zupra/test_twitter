import Vue from 'vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

import App from './App.vue'
import Home from './Home.vue'
import Search from './Search.vue'
const NotFoundPage = {
  template: `
    <center class="page NotFoundPage">
      <h1>404</h1>
      <router-link to="/">На главную</router-link>
    </center>
  `
};


const store = new Vuex.Store({
  state: {
    twList: null
  },
  getters: {
    getTwList: state => state.twList
  },
  mutations: {
    setTwList(state, twList) {
      state.twList = [...twList]
    }
  }
});


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/search/:search?", name: "search", component: Search },
    { path: "*", name: "wtf",   component: NotFoundPage }
  ]
});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})