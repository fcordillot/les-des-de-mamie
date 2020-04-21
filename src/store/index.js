import Vue from 'vue'
import Vuex from 'vuex'

import getCurrentMediaQuery from '@area17/a17-helpers/src/utility/getCurrentMediaQuery'

// Helpers
import { isTouchDevice, tabletBreakpoints, mobileBreakpoints } from '@/helpers/globals'
import { getColorScheme } from '@/helpers/dark-mode'
import { getLang } from '@/helpers/lang'
import Support from '@/helpers/support'
import { STATE, MUTATIONS, GETTERS } from '@/store/helpers'

// Data
import imagesData from '@/data/images'
import globalData from '@/data/global'

Vue.use(Vuex)

export const state = {
  [STATE.support]: new Support(),
  [STATE.lang]: getLang(),
  [STATE.mediaQuery]: getCurrentMediaQuery(),
  [STATE.isTouchDevice]: isTouchDevice(),
  [STATE.isRetina]: window.devicePixelRatio > 1,
  [STATE.direction]: 'ltr',
  [STATE.pageHeight]: 0,
  [STATE.canAutoPlayVideo]: false,
  [STATE.lang]: 'en',
  [STATE.windowW]: window.inenrWidth,
  [STATE.windowH]: window.innerHeight,
  [STATE.enableLazyLoad]: true,
  [STATE.documentHeight]: 0,
  [STATE.gtmEventsSent]: [],
  [STATE.colorScheme]: getColorScheme(),
  [STATE.images]: imagesData(),
  [STATE.globalData]: globalData()
}

export const getters = {
  [GETTERS.support]: state => state.support,
  [GETTERS.lang]: state => state.lang,
  [GETTERS.isTabletDevice]: state => tabletBreakpoints.includes(state[STATE.mediaQuery]),
  [GETTERS.isMobileDevice]: state => mobileBreakpoints.includes(state[STATE.mediaQuery]),
  [GETTERS.isGtmEventSent]: state => eventUid => state[STATE.gtmEventsSent].includes(eventUid),
  [GETTERS.colorScheme]: state => state.colorScheme,
  [GETTERS.images]: state => state.images,
  [GETTERS.globalData]: state => state.globalData
}

export const mutations = {
  [MUTATIONS.support] (state, support) {
    state[STATE.support] = support
  },
  [MUTATIONS.lang] (state, lang) {
    state[STATE.lang] = lang
  },
  [MUTATIONS.mediaQuery] (state) {
    state[STATE.mediaQuery] = getCurrentMediaQuery()
  },
  [MUTATIONS.pageHeight] (state, pageHeight) {
    state[STATE.pageHeight] = pageHeight
  },
  [MUTATIONS.documentHeight] (state, documentHeight) {
    state[STATE.documentHeight] = documentHeight
  },
  [MUTATIONS.direction] (state, direction) {
    state[STATE.direction] = direction
  },
  [MUTATIONS.autoplayVideo] (state, autoplay) {
    state[STATE.canAutoPlayVideo] = autoplay
  },
  [MUTATIONS.lang] (state, lang) {
    state[STATE.lang] = lang
  },
  [MUTATIONS.windowW] (state) {
    state[STATE.windowW] = window.innerWidth
  },
  [MUTATIONS.windowH] (state) {
    state[STATE.windowH] = window.innerHeight
  },
  [MUTATIONS.enableLazyLoad] (state) {
    state[STATE.enableLazyLoad] = true
  },
  [MUTATIONS.sendGtmEvent] (state, eventUid) {
    state[STATE.gtmEventsSent].push(eventUid)
  },
  [MUTATIONS.colorScheme] (state, colorScheme) {
    state[STATE.colorScheme] = colorScheme
  },
  [MUTATIONS.images] (state, images) {
    state[STATE.images] = images
  },
  [MUTATIONS.globalData] (state, globalData) {
    state[STATE.globalData] = globalData
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations
})
