import Vue from 'vue'
import './registerServiceWorker'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import App from './App.vue'
import { SENTRY_DSN } from '@/config/index'
import '@/assets/css/normalize.css'
import { ReqError } from '@/utils/sentryError'

// sentry 配置
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})

if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(new ReqError('Test req error'))
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
