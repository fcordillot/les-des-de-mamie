<template>
  <div class="phome">
    <div class="phome__map" id="lddm-map"></div>
  </div>
</template>

<script>
  // Dependencies
  import mapboxgl from 'mapbox-gl'

  // Mixins
  import PageMixin from '@/mixins/page'

  // Helpers
  import { EventBus } from '@/helpers/event-bus'

  // Controllers
  import { fetchData } from '@/controllers/Data'

  export default {
    name: 'PHome',
    pageName: 'home',
    mixins: [PageMixin],

    data () {
      return {
        loading: true,
        data: null
      }
    },

    created () {
      this.map = null

      // Events
      EventBus.$on('resize', this._onResize)
    },

    async mounted () {
      await this.$nextTick()

      this._onResize()

      this.data = await fetchData()

      this.loading = false

      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN

      this._createMap()
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
      },

      // Mapbox
      _createMap () {
        this.map = new mapboxgl.Map({
          container: 'lddm-map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [this.data['Dés'].__map[this.data['Dés'].__map.length - 1].fields.Longitude, this.data['Dés'].__map[this.data['Dés'].__map.length - 1].fields.Latitude],
          // zoom: 11,
          // attributionControl: false
        })

        this.map.on('load', this._onMapLoad)
      },

      _onMapLoad () {
        this.data['Dés'].__map.forEach(thimble => {
          // create a HTML element for each feature
          const $el = document.createElement('div')
          $el.className = 'is-a-map-dot'

          // make a marker for each feature and add to the map
          new mapboxgl.Marker($el)
            .setLngLat([ thimble.fields.Longitude, thimble.fields.Latitude ])
            .addTo(this.map)
        })
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

    overflow: hidden;
  }

  .phome__map {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="scss">
  .is-a-map-dot {
    width: $base-px / 1.5;
    height: $base-px / 1.5;

    border-radius: 50%;
    background-color: red;
    cursor: pointer;

    &:before {
      content: "";

      position: absolute;
      top: -$base-px / 2;
      right: -$base-px / 2;
      bottom: -$base-px / 2;
      left: -$base-px / 2;
    }
  }
</style>
