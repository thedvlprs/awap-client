import Vue from 'vue'
import App from './App.vue'

/* === === === === === */
/* Modules
/* === === === === === */

import router from './router'

import VueQrcode from '@chenfengyuan/vue-qrcode';
Vue.component('qrcode', VueQrcode)

/* === === === === === */
/* Action
/* === === === === === */

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
