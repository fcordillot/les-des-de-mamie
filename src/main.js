import 'es6-promise/auto'
import Vue from 'vue'

import App from './App.vue'
import router from './router/router'
import store from './store'

// Components
import LDDMLazyLoad from '@/components/media/LDDMImageLazyLoad'
import LDDMMedia from '@/components/media/LDDMMedia'
import LDDMImage from '@/components/media/LDDMImage'
import LDDMIcon from '@/components/svg/LDDMSvgSIcon'
import LDDMText from '@/components/text/LDDMText'

import { ObserveVisibility } from 'vue-observe-visibility'

require('intersection-observer')
require('@/polyfills/customEvent')

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.performance = process.env.NODE_ENV !== 'production'

Vue.directive('observe-visibility', ObserveVisibility)

Vue.component('lddm-image-lazy-load', LDDMLazyLoad)
Vue.component('lddm-media', LDDMMedia)
Vue.component('lddm-image', LDDMImage)
Vue.component('lddm-svg-icon', LDDMIcon)
Vue.component('lddm-text', LDDMText)

// Hack to fix ie11 bcg bug
if (navigator.userAgent.match(/Trident\/7\./)) {
  const fixScroll = (event) => {
    event.preventDefault()
    var wd = event.wheelDelta
    var csp = window.pageYOffset
    window.scrollTo(0, csp - wd)
  }

  document.addEventListener('app:in-menu', () => {
    document.body.removeEventListener('mousewheel', fixScroll)
  })

  document.addEventListener('app:out-menu', () => {
    document.body.addEventListener('mousewheel', fixScroll)
  })

  document.body.addEventListener('mousewheel', fixScroll)
}

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

document.addEventListener('DOMContentLoaded', function () {
  app.$mount('#app')
  document.dispatchEvent(new CustomEvent('app:pre-rendering'))
})
