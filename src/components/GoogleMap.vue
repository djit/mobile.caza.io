<template>
  <gmap-map
    :center="center"
    :zoom="13"
    style="width: 100%; height: 100%">
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center=m.position">
    </gmap-marker>
  </gmap-map>
</template>


<script>

export default {
  props: ['coords'],
  data () {
    return {
      center: this.coords,
      markers: [{
        position: this.coords
      }, {
        position: this.coords
      }]
    }
  }
}
</script>