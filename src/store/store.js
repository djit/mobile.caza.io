import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    query: {
      group: 'residential',
      transaction: 'rent',
      location: '',
      type: '',
      bedrooms: '',
      pricemin: '',
      pricemax: '',
      size: ''
    },
    query_updated: false,
    properties: [],
    property: [],
    token: '',
    contact: false,
    fullscreen: false,
    gallery: false
  },
  mutations: {
    setQuery(state, payload) {
      state.query = payload
      state.query_updated = true
    },
    setProperties(state, payload) {
      state.properties = payload
    },
    showProperty(state, payload) {
      state.property = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    resetQuery(state) {
      state.query_updated = false
    },
    openGallery(state) {
      state.gallery = true
      state.fullscreen = true
    },
    closeGallery(state) {
      state.gallery = false
      state.fullscreen = false
    },
    openContact(state) {
      state.contact = true
      state.fullscreen = true
    },
    closeContact(state) {
      state.contact = false
      state.fullscreen = false
    }
  }

})