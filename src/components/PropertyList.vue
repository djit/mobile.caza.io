<template>
  <div>
    <v-toolbar color="primary" fixed height="45">
      <!--v-icon @click="goBack">arrow_back</v-icon-->
      <v-toolbar-title v-show="!loading" class="white--text">
        Results: {{ properties.length }}<br>
        <span class="subtitle">
          {{ query.bedrooms }} <span v-if="query.bedrooms">bedrooms</span> {{ query.type }}<span v-if="query.price">, price: {{ query.price }}</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!--span class="right tools white-text bold">SORT</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
      <span class="right tools white--text bold" @click="goSearch">FILTER</span>
    </v-toolbar>
    
    <div class="content">
      <template v-for="(property, index) in properties">
        <lazy-component>
          <property-card :property="property" :key="property._id" v-if="!property.meta.featured"></property-card>

          <property-card-featured :property="property" :key="property._id" v-if="property.meta.featured"></property-card-featured>
        </lazy-component>
        <v-card height="100" v-if="index === 3 || index === 10">
          <adsense
            ad-client="ca-pub-1605817136107738"
            ad-slot="7949400845"
            ad-style="display: block; height:100px"
            ad-format="fluid">
          </adsense>
        </v-card>
      </template>
    
      <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>
    </div>
  </div>
</template>


<script>
import PropertyCard from '@/components/PropertyCard'
import PropertyCardFeatured from '@/components/PropertyCardFeatured'
import VueAdsense from 'vue-adsense'

export default {
  name: 'properties',
  components: { PropertyCard, PropertyCardFeatured, adsense: VueAdsense  },
  data() {
    return {
      loading: false,
    }
  },
  mounted() {
    if(this.query_updated) {
      this.search()
    }
  },
  methods: {
    showProperty: function(property) {
      this.$store.commit('showProperty', property)
      this.$router.push('/properties/' + property._id)
    },
    search: function() {
      console.log('searching...')
      this.loading  = true
      var q = 'locale=ae&group=' + this.query.group  + '&transaction=' + this.query.transaction + '&location=' + this.query.location + '&type=' + this.query.type + '&bedrooms=' + this.query.bedrooms + '&pricemin=' + this.query.pricemin + '&pricemax=' + this.query.pricemax + '&size=' + this.query.size
      //axios.get('https://ae.caza.io/api/search?' + q)
      var url = API_ENDPOINT + 'search?' + q
      axios.get(url)
      .then(response => {
        this.$store.commit('setProperties', response.data.properties)
        this.$store.commit('setToken', response.data.token)
        this.$store.commit('resetQuery')
        this.loading = false
      })
      .catch(error => {
        console.log(error)
        return
      }) 
    },
    goSearch() {
      this.$router.push('/search')
    },
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    handler: function() {
      
    }
  },
  computed: {
    properties() {
      return this.$store.state.properties
    },
    query() {
      return this.$store.state.query
    },
    query_updated() {
      return this.$store.state.query_updated
    }
  }
}
</script>


<style>
.toolbar__title {
  font-size: 14px;
}
.toolbar__title .subtitle {
  font-size: 12px;
}
.results {
  font-size: 13px;
  width: 100%;
  height: 30px;
  background-color: #fff;
  color: #333;
  margin-top: 60px;
  padding: 5px 15px;
}
.content {
  margin-top: 50px;
  padding: 10px;
  background: #f2f2f2;
  font-size: 12px;
}
.orange-text {
    color: #ff7200;
}
.card {
    margin-bottom: 20px;
    background: transparent;
    position: relative;
}
.card__title {
    text-transform: capitalize;
    padding: 10px;
}
.card__actions {
    padding: 0 10px;
}
.card__text {
    padding: 0 10px;
} 
.img-count {
    position: absolute;
    bottom: 5px;
    left: 10px;
    color: #fff;
    font-weight: bold;
}
.details {
    margin-top: 0;
    padding-top: 0;
    background: transparent;
}
.details .list__tile {
    margin: 0;
    padding: 5px 0;
    height: auto;
}
.list__tile__content {
    padding: 0px;
}
.list__tile__sub-title .value {
    float: right;
}
.list__tile__sub-title .ref,
.list__tile__sub-title.ref .value {
    text-transform: uppercase;
    color: #000;
}
.bottom-actions {
    margin: 0 0 20px 0;
}
.bottom-actions button {
    margin: 5px 0;
}
</style>