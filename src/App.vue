<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>


<script>
import Home from '@/components/Home'

export default {
  name: 'app',
  components: { Home }
}
</script>


<style lang="stylus">
  @require './stylus/main'
</style>

<style>
.orange-text {
    color: #ff7200;
}
.bold {
    font-weight: bold;
    color: #000;
}
.content {
  padding: 20px;
  margin-top: 60px;
  font-size: 12px;
}
.content label,
.content input {
  font-size: 12px;
}
</style>
