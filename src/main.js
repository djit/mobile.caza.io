// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'
import axios from 'axios'
import Vuetify from 'vuetify'
//import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueLazyloadComponent from 'vue-lazyload-component'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(Vuetify)
//Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(VueLazyloadComponent)
Vue.use(VueCookies);
Vue.use(VueGoogleMaps, {
  load: {key: 'AIzaSyCQVq0r8ZEN8l91yGggs5GY5KD1xdbzprc' }
});

window.axios = axios


// Custom filters
// --------------------------------
Vue.filter('_number', function(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
})

Vue.filter('_pluralize', function(value, text) {
  if(parseInt(value) > 1)
    return text + 's'
  else
    return text
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, router,
  template: '<App/>',
  components: { App }
})
