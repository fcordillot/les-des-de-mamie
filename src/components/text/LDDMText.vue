<template>
  <p class="lddm-text"
     ref="text"
     v-html="text"></p>
</template>

<script>
  export default {
    name: 'LDDMText',

    props: {
      text: {
        type: String,
        default: ''
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .lddm-text {

  }
</style>
