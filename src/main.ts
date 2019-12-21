import Vue from 'vue'
import './registerServiceWorker'
import App from './App.vue'
import '@/assets/css/normalize.css'
import '@/utils/index'
import { sendReqError } from '@/utils/sentryError'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
