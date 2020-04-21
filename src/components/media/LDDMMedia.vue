<template functional>
  <div class="lddm-media"
       :class="`lddm-media--${props.type}`">
    <div class="lddm-media__inner">
      <div class="lddm-media__aspect-ratio" :style="{backgroundColor: props.aspectRatioBcg}">
        <div class="lddm-media__aspect-ratio-content">
          <!-- @slot Media content inside aspect ratio box-->
          <slot></slot>
        </div>
      </div>
    </div>

    <div v-if="props.caption"
         class="lddm-media__caption">
      <span v-html="props.caption"></span>
    </div>
  </div>
</template>

<script>
  /**
   * Media container.
   * Render a media component (Image / video...) inside an aspect ratio box from type.
   */
  export default {
    name: 'LDDMMedia',

    props: {
      /**
       * Aspect ratio type. Available values: full-width, large (960 * 535), video (1920 * 1080), Miny Story (375 * 500)
       */
      type: {
        type: String,
        required: true
      },
      /**
       * Background color for aspect ratio box
       */
      aspectRatioBcg: {
        type: String,
        default: 'transparent'
      },
      /**
       * Caption for media
       */
      caption: {
        type: [String, Boolean],
        default: false
      }
    }
  }
</script>

<style lang="scss">
  // Use style here for nested functionnal components
  // @see: https://github.com/vuejs/vue-loader/issues/1259
  .lddm-media {
    &.lddm-media--slide-intersticiel,
    &.lddm-media--p-footer,
    &.lddm-media--large,
    &.lddm-media--video {
      @extend %container;
      @include margin-container();
      @include breakpoint('medium-') {
        width: 100%;
      }
    }
  }

  .lddm-media .lddm-media--prologue {
    @extend %container;
    @include breakpoint('medium-') {
      width: 100%;
    }
  }
</style>

<style lang="scss" scoped>
  .lddm-media {
    max-width: $max-width;
    margin-left: auto;
    margin-right: auto;
  }

  .lddm-media__inner {
    .lddm-media--large & {
      @include width-multi((
        large: 10,
        xlarge: 10
      ));

      @include push-multi((
        large: 1,
        xlarge: 1
      ));
    }

    .lddm-media--video & {
      @include width-multi((
        large: 12,
        xlarge: 12
      ));

      width: 100%;
    }
  }

  .lddm-media__aspect-ratio {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    @include aspect-ratio(375, 500, 'lddm-media__aspect-ratio-content');

    @include breakpoint('medium+') {
      @include aspect-ratio(1280, 800, 'lddm-media__aspect-ratio-content');
    }

    /* media types */
    .lddm-media--full-width & {
      @include breakpoint('small-') {
        max-width: 375px;
      }
    }

    .lddm-media--mini-story & {
      width: 100%;
      @include aspect-ratio(375, 500, 'lddm-media__aspect-ratio-content');

      @include breakpoint('small+') {
        max-width: 375px;
      }
    }

    .lddm-media--large & {
      width: 100%;
      @include aspect-ratio(960, 535, 'lddm-media__aspect-ratio-content');
    }

    .lddm-media--video & {
      width: 100%;
      @include aspect-ratio(1920, 1080, 'lddm-media__aspect-ratio-content');
    }

    .lddm-media--prologue & {
      height: 100%;
      max-width: 138px;
      max-height: 300px;
      @include aspect-ratio(138, 300, 'lddm-media__aspect-ratio-content');
    }

    .lddm-media--slide-intersticiel & {
      max-width: 760px;
      @include aspect-ratio(760, 480, 'lddm-media__aspect-ratio-content');
    }

    .lddm-media--p-look & {
      width: 100%;
      @include aspect-ratio(375, 500, 'lddm-media__aspect-ratio-content');

      @include breakpoint('medium') {
        @include aspect-ratio(560, 770, 'lddm-media__aspect-ratio-content');
      }

      @include breakpoint('large+') {
        @include aspect-ratio(760, 1000, 'lddm-media__aspect-ratio-content');
      }
    }
  }

  .lddm-media__aspect-ratio-content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .lddm-media__caption {
    text-align: center;
    color: map-get($colors-list, 'white-near');
  }
</style>
