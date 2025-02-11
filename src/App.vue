<template>
  <div class="app"
       :class="elClasses">
    <lddm-loader ref="loader" @hide="loaderHidden"></lddm-loader>

    <router-view ref="page" />
  </div>
</template>

<script>
  // Store
  import { GETTERS as G, MUTATIONS as M, STATE as S } from '@/store/helpers'

  // Behavior
  import ScrollRAF from '@/behavior/scrollRAF'

  // Helpers
  import { isAutoplaySupportedOldBrowser } from '@/helpers/videos'
  import { throttle } from '@/helpers/globals'
  import { enableScroll } from '@/helpers/scroll'
  import { EventBus } from '@/helpers/event-bus'

  // Components
  import LDDMLoader from '@/components/loader/LDDMLoader'

  export default {
    components: {
      'lddm-loader': LDDMLoader
    },

    data () {
      return {
        env: process.env.VUE_APP_ENV,
        error: null,
        loading: true
      }
    },

    computed: {
      elClasses () {
        return [
          this.loading ? 'is-loading' : ''
        ]
      },

      windowH () {
        return this.$store.state[S.windowH]
      },

      isMobileDevice () {
        return this.$store.getters[G.isMobileDevice]
      },

      support () {
        return this.$store.getters[G.support]
      }
    },

    beforeCreate () {
      isAutoplaySupportedOldBrowser().then(() => {
        this.$store.commit(M.autoplayVideo, true)
      }).catch(() => {
        this.$store.commit(M.autoplayVideo, false)
      })
    },

    created () {
      this._updateBodyClass()
    },

    mounted () {
      enableScroll()

      this.$store.commit(M.mediaQuery)
      window.addEventListener('resize', this.onResize)

      this.onResize()
    },

    beforeDestroy () {
      window.removeEventListener('resize', this.onResize)
      document.removeEventListener('app:back-to-top', this.handleBackToTop, false)
    },

    methods: {
      // BODY
      _updateBodyClass () {
        const $body = document.body

        if ($body && this.support.classes.length > 0) {
          this.support.classes.map(c => $body.classList.add(c))

          $body.classList.add(`color-scheme--${this.$store.getters[G.colorScheme]}`)
        }
      },

      // Child's Events
      loaderHidden () {
        this.loading = false
      },

      // RAF
      scrollRafCallback (event) {
        this.toggleVisibilityTracker(event.scrollY)
      },

      toggleVisibilityTracker (scroll) {
        this.menuIsShown = scroll >= this.showMenuOffset
      },

      startRaf () {
        if (this.scrollRafID) return
        this.$nextTick(() => {
          this.scrollRafID = ScrollRAF.add(this.scrollRafCallback)
        })
      },

      stopRaf () {
        if (this.scrollRafID) this.scrollRafID = ScrollRAF.remove(this.scrollRafID)
      },

      // Events
      onResize: throttle(function () {
        this.$store.commit(M.mediaQuery)
        this.$store.commit(M.windowW)
        this.$store.commit(M.windowH)

        EventBus.$emit('resize')
      }, 200)
    }
  }
</script>

<style lang="scss">
  @import "scss/app";

  html,
  body {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  #main + footer {
    background-color: #FFF;
  }
</style>

<style lang="scss" scoped>
  .app {
    width: 100vw;
    min-height: 100vh;
  }
</style>
