require('./bootstrap')
require('./plugins')

import Vue from 'vue'
import DefaultTemplate from './layouts/DefaultTemplate'
import router from './routes'
import store from './store'



Vue.config.productionTip = false

new Vue({
  render: h => h(DefaultTemplate),
  router,
  store
}).$mount('#app')
