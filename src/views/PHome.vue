<template>
  <div class="phome">

  </div>
</template>

<script>
  // Mixins
  import PageMixin from '@/mixins/page'

  // Helpers
  import { EventBus } from '@/helpers/event-bus'

  export default {
    name: 'PHome',
    pageName: 'home',
    mixins: [PageMixin],

    created () {
      // Events
      EventBus.$on('resize', this._onResize)
    },

    mounted () {
      this._onResize()
    },

    detroyed () {
      // Events
      EventBus.$off('resize', this._onResize)
    },

    methods: {
      // Events
      _onResize () {
        let vh = window.innerHeight * 0.01
        // Then we set the value in the --vh custom property to the root of the document
        this.$el.style.setProperty('--vh', `${vh}px`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .phome {
    position: relative;
    min-height: 100vh;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
</style>
