<template lang="html">
  <section class="lddm-loader" :class="[ isActive ? 'is-active' : 'is-inactive', isVisible ? 'is-visible' : 'is-hidden' ]">

</section>
</template>

<script>
  // Mixins
  import BaseMixin from '@/mixins/base'

  // Helpers
  import { EventBus } from '@/helpers/event-bus'

  // Data
  import loaderData from '@/data/loader'

  export default {
    name: 'LDDMLoader',

    mixins: [BaseMixin],

    data () {
      return {
        isActive: true,
        isVisible: true,
        content: loaderData()
      }
    },

    created () {
      // Events
      EventBus.$on('LDDMLoader:hide', this.hide)
      EventBus.$on('LDDMLoader:show', this.show)
    },

    destroyed () {
      // Events
      EventBus.$off('LDDMLoader:hide', this.hide)
      EventBus.$off('LDDMLoader:show', this.show)
    },

    methods: {
      // Events
      hide () {
        this.isActive = false

        setTimeout(() => {
          this.isVisible = false
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lddm-loader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    transform: translateZ(0);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    opacity: 1;
    visibility: visible;
    background-color: white;

    transition: opacity 1s $ease-out-quint, visibility 1s;
    will-change: opacity, visibility;

    // &.is-active {
    //   opacity: 1;
    //   visibility: visible;
    // }

    &.is-active,
    &.is-hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
