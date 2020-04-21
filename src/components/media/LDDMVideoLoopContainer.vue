<template>
  <div class="lddm-video-loop-container" v-observe-visibility="visibilityOpts">
    <lddm-media type="video">
      <div class="lddm-video-loop-container__inner"
           :class="innerClass">
        <lddm-video-loop v-if="isVisible"
                          :video="video"/>
      </div>
    </lddm-media>
  </div>
</template>

<script>
  // Components
  import LDDMVideoLoop from '@/components/media/LDDMVideoLoop'

  // Mixins
  import visibilityMixin from '@/mixins/visibility'

  // Store
  import { STATE as S } from '@/store/helpers'

  /**
   * Video Loop Container
   * Display video inside container with define aspect ratio (1920 * 1080)
   */
  export default {
    name: 'LDDMVideoLoopContainer',

    mixins: [visibilityMixin],

    components: {
      'lddm-video-loop': LDDMVideoLoop
    },

    props: {
      /**
       * Video Object. Should have .mp4 key and .webm key.
       */
      video: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        isVisible: false,
        revealVideo: false,
        vRootMargin: `${this.$store.state[S.windowH] * 1.5}px`
      }
    },

    computed: {
      innerClass () {
        return {
          'lddm-video-loop__inner--loaded': this.revealVideo
        }
      }
    },

    methods: {
      isVisibleCallback () {
        this.isVisible = true
        window.requestAnimationFrame(() => {
          this.revealVideo = true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lddm-video-loop-container__inner {
    opacity: 0;
    width: 100%;
    transition: opacity 600ms $bezier--ease--cubic-in-out;

    &.lddm-video-loop-container__inner--loaded {
      opacity: 1;
    }
  }
</style>
