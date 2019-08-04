import Vue from 'vue'
import Router from 'vue-router'

import homeView from './views/home.vue'
import authView from './views/auth.vue'
import accountView from './views/account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: homeView
    },
    {
      path: '/auth',
      alias: '/register',
      name: 'auth',
      component: authView
    },
    {
      path: '/account',
      name: 'account',
      component: accountView
    }
  ]
})
