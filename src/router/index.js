import Vue from 'vue'
import VueRouter from 'vue-router'
import { cameCaseToShortLine } from '../utils/string'
import { routerConfigs } from './config'

Vue.use(VueRouter)

function resolveComponent(name) {
  return () => import(/* webpackChunkName: "chunk-[request][index]" */ `@/views/${name}.vue`)
}

function resolveRoutes(configArr) {
  return configArr.map(({ path, name, component }) => {
    const config = { name, path, component }
    if (!path) {
      config.path = `/${ cameCaseToShortLine(name)}`
    }
    if (!component) {
      config.component = resolveComponent(name)
    }
    return config
  })
}

export const routes = resolveRoutes(routerConfigs)
const router = new VueRouter({
  routes,
})

export default router
