<template>
  <div class="home">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap color="primary">
        <v-flex xs12 class="logo-container container">
          <img src="/static/logo.jpg" class="logo">
        </v-flex>
        <v-flex xs12 class="fields-container container">
          <v-layout wrap>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs6>
                  <v-select
                    label="I want to"
                    :items="transOptions"
                    v-model="query.transaction"
                    width="30"
                    solo>
                  </v-select><br>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    label="a"
                    :items="typeOptions"
                    v-model="query.type"
                    solo>
                  </v-select><br>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
        </v-flex>

        <v-flex xs12>
          <v-container grid-list-xs>
          <v-select
            label="in"
            autocomplete
            :loading="loading"
            cache-items
            :items="locations"
            :search-input.sync="searchLocation"
            v-model="query.location"
            no-data-text=""
            tags
            solo>
          </v-select> 
        </v-container>
        </v-flex>
        <v-flex xs12 class="button-container container">
          <v-container>
            <v-btn color="orange" @click="search" block>Search</v-btn>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import Autocomplete from 'vue2-autocomplete-js'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { autocomplete: Autocomplete },
    data() {
    return {
      locations: [],
      searchLocation: null,
      loading: false,
      typeOptions: [
        {text: 'Property type', value: ''},'apartment', 'villa', 'townhouse', 'penthouse', 'building', 'plot', 'land'
      ],
      transOptions: [
        {text: 'rent', value: 'rent'},
        {text: 'buy', value: 'sale'}
      ],
    }
  },
  computed: {
    query() {
      return {
        group: this.$store.state.query.group,
        transaction: this.$store.state.query.transaction,
        location: this.$store.state.query.location,
        type: this.$store.state.query.type,
        bedrooms: this.$store.state.query.bedrooms,
        pricemin: this.$store.state.query.pricemin,
        pricemax: this.$store.state.query.pricemax,
        size: this.$store.state.query.size,
      }
    }
  },
  watch: {
    searchLocation (val) {
      val && this.getLocations(val)
    }
  },
  methods: {
    search() {
      this.$store.commit('setQuery', this.query)
      this.$router.push('/properties')
    },
    getLocations (v) {
      this.loading = true
      var q = 'locale=ae&group=' + this.query.group + '&transaction=' + this.query.transaction + '&query=' + v.toLowerCase()
      axios.get('https://api.caza.io/api/locations?' + q)
      //axios.get('https://ae.caza.dev/api/locations?' + q)
      .then(response => {
        this.locations = response.data.map(e => {
          return e.value
        })
        this.loading = false
      })
      .catch(error => {
        console.log(error)
        return
      }) 
    },
  }
}
</script>


<style>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #005caa;
  padding: 10px 5px;
}
.button-container {
  margin-top: 30px;
}
.container {
 
}
.logo-container,
.fields-container {
  margin-top: 20%;
}
.application--light .input-group.input-group--dirty .input-group__selections__comma,
.application--light .input-group.input-group--dirty .input-group__selections__comma.input-group__selections__comma--active{
  font-size: 14px;
  color: #fff;
}
</style>