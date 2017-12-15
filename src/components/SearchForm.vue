<template>
  <div>
    <v-toolbar color="primary" v-bind:fixed="true">
      <v-toolbar-title class="white--text"><router-link to="/"><img src="/static/logo.jpg" class="logo"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="goBack"><v-icon color="white">cancel</v-icon></v-btn>
    </v-toolbar>
    <div class="content">
      <v-radio-group v-model="query.group" row>
          <v-radio label="Residential" value="residential" color="primary"></v-radio>
          <v-radio label="Commercial" value="commercial" color="primary"></v-radio>
      </v-radio-group>
      <v-radio-group v-model="query.transaction" row>
          <v-radio label="For Rent" value="rent" color="primary"></v-radio>
          <v-radio label="For Sale" value="sale" color="primary"></v-radio>
      </v-radio-group>
      <v-select
        label="location, project"
        autocomplete
        :loading="loading"
        cache-items
        :items="locationOptions"
        :search-input.sync="searchLocation"
        v-model="query.location"
        no-data-text=""
        clearable
        tags
        solo>
      </v-select><br>
      <v-select
        label="Type"
        :items="typeOptions"
        v-model="query.type"
        solo>
      </v-select><br>
      <v-select
        label="Bedrooms"
        hint="bedrooms"
        :items="bedroomsOptions"
        v-model="query.bedrooms"
        solo
        clearable>
      </v-select><br>
        <v-text-field
          hint="Price min"
          persistent-hint
          v-model="query.pricemin"
          prefix="AED"
          suffix="Price min"
          solo>
        </v-text-field><br>
        <v-text-field
          hint="Price max"
          persistent-hint
          v-model="query.pricemax"
          prefix="AED"
          suffix="Price max"
          solo>
        </v-text-field><br>
        <v-text-field
          persistent-hint
          v-model="query.size"
          prefix="SQFT"
          suffix="Size"
          solo>
        </v-text-field><br>
      <div class="text-xs-center">
        <v-btn color="primary" @click="search" block>Search</v-btn>
      </div>
    </div>
  </div>
</template>


<script>
import Autocomplete from 'vue2-autocomplete-js'
import { mapState } from 'vuex'

export default {
  name: 'searchform',
  components: { autocomplete: Autocomplete },
  data() {
    return {
      locationOptions: [],
      searchLocation: null,
      loading: false,
      typeOptions: [
        {text: 'Property type', value: ''},'apartment', 'villa', 'townhouse', 'penthouse', 'building', 'plot', 'land'
      ],
      bedroomsOptions: [1,2,3,4,5,6],
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
    },
    max() {
      if(this.query.transaction == 'rent')
        return 500000
      else
        return 100000000
    },
    step() {
      if(this.query.transaction == 'rent')
        return 1000
      else
        return 10000
    }
  },
  watch: {
    searchLocation (val) {
      val && this.getLocations(val)
    }
  },
  mounted() {

  },
  methods: {
    search: function() {
      this.$store.commit('setQuery', this.query)
      this.$router.push('/properties')
    },
    getLocations (v) {
      var self = this
      this.loading = true
      var q = 'locale=ae&group=' + this.query.group + '&transaction=' + this.query.transaction + '&query=' + v.toLowerCase()
      axios.get('https://api.caza.io/api/locations?' + q)
      //axios.get('https://ae.caza.dev/api/locations?' + q)
      .then(response => {
        this.locationOptions = response.data.map(e => {
          return e.value
        })
        this.loading = false
      })
      .catch(error => {
        console.log(error)
        return
      }) 
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    alert() {
      return alert('ok')
    }
  }
}
</script>


<style>
.toolbar {
  color: #fff;
  height: 50px;
  padding: 0;
}
.content {
  padding: 20px;
  margin-top: 60px;
  font-size: 12px;
}
.content label {
  font-size: 14px;
}
.content input {
  font-size: 14px;
}
.radio-group {
  padding-top: 0;
}
.content .input-group--text-field__prefix,
.content .input-group--text-field__suffix  {
  font-size: 14px;
}


</style>