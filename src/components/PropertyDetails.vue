<template>
  <div>
    <div v-if="!fullscreen">
      <v-card>
        <v-toolbar card fixed color="transparent">
          <v-icon dark @click="goBack">arrow_back</v-icon>
          <v-spacer></v-spacer>
          <!--v-icon dark>share</v-icon-->
        </v-toolbar>
        <v-carousel 
          hide-controls 
          v-bind:cycle="false" 
          v-bind:left-control-icon="false" 
          v-bind:right-control-icon="false">
            <v-carousel-item 
              v-for="(img,i) in property.images" 
              v-bind:src="img" 
              :key="i"
              @click="openGallery">
              <div class="img-count">{{ i+1 }}/{{ property.images.length }}</div>
            </v-carousel-item>
        </v-carousel>

        <v-card-title primary-title>
          <div>
            <h2 class="subheading mb-0">{{ property.name }}</h2>
            <span class="grey--text">{{ property.community }},  {{ property.city }}</span>
          </div>
        </v-card-title>

        <v-card-text>
          <v-list class="details">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title class="ref">
                  <span class="mb-0 bold">
                    AED <span class="orange-text">{{property.price | _number }}</span>
                  </span>
                  <span class="value bold">REF: {{ property.reference}}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  type
                  <span class="value">{{ property.type }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                    size
                    <span class="value">{{ property.size | _number }} sqft</span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  bedrooms
                  <span class="value">{{ property.bedrooms }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  parkings
                  <span class="value">{{ property.parking }}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <div class="features grey--text">
            Facilities:
            <ul>
              <li v-for="facility in property.facilities">{{ facility }}</li>
            </ul>
          </div>
          <!--img :src="logo"-->
        </v-card-text>
      </v-card>

      <v-card height="auto" class="broker-info">
        <v-container fluid grid-list-sm>
          <v-layout row>
            <v-flex xs5>
              <!--v-card-media :src="property.broker.logo" height="80px" contain></v-card-media-->
            </v-flex>
            <v-flex xs7>
              <v-card-title>
                <h2 class="">{{ property.broker_name }}</h2>
                <!--span class="grey--text address">{{ property.broker.address }}, {{ property.broker.city }}</span-->
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <v-card height="300px">
        <google-map :coords="coords"></google-map>
      </v-card>

      <div class="footer-toolbar">
        <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6><a :href="'tel:' + property.contact_phone"><v-btn color="orange" class="">CALL</v-btn></a></v-flex>
          <v-flex xs6><v-btn color="orange" @click="openContact">CONTACT</v-btn></v-flex>
        </v-layout>
      </v-container>
      </div>
    </div>

    <div class="img-container" v-if="fullscreen & gallery">
      <v-toolbar card fixed color="transparent">
        <v-icon dark @click="closeGallery">close</v-icon>
      </v-toolbar>
      <v-carousel 
      hide-controls 
      v-bind:cycle="false" 
      v-show="true">
        <v-carousel-item 
          v-for="(img,i) in property.images" 
          v-bind:src="img" 
          :key="i"
          @click="open()">
          <div class="img-count">{{ i+1 }}/{{ property.images.length }}</div>
        </v-carousel-item>
      </v-carousel>
    </div>

    <contactform v-if="fullscreen & contact" :property="property" :property_id="property._id"></contactform>
  </div>
</template>


<script>
import ContactForm from '@/components/ContactForm'
import GoogleMap from '@/components/GoogleMap'

export default {
  name: 'property-details',
  components: { contactform: ContactForm, GoogleMap },
  data() {
    return {
    }
  },
  beforeMount() {
    if (!this.$store.state.property.name) {
      this.$router.push('/')
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    property() {
      return this.$store.state.property
    },
    coords() {
      return {lat: this.property.location.coordinates[0], lng: this.property.location.coordinates[1]}
    },
    fullscreen() {
      return this.$store.state.fullscreen
    },
    gallery() {
      return this.$store.state.gallery
    },
    contact() {
      return this.$store.state.contact
    },
  },
  methods: {
    goBack () {
      this.$store.commit('resetQuery')
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    // call phone number
    call() {
      this.$router.push('tel:' + this.property.contact_phone)
    },
    // open fullscreen carousel
    openGallery(el) {
      this.$store.commit('openGallery')
    },
    // close fullscreen
    closeGallery() {
      this.$store.commit('closeGallery')
    },
    // open contact form
    openContact() {
      this.$store.commit('openContact')
    },
    closeContact() {
      this.$store.commit('closeContact')
    }
  }
}
</script>



<style scoped>
a,
a.router-link,
a.router-link-active {
  text-decoration: none;
  color: #fff;
}
.ref {
  font-weight: bold;
  font-size: 15px;
}
.orange-text {
  color: #ff7200;
  font-weight: bold;
}
.bold {
  font-weight: bold;
  color: #000;
}
.card .toolbar.toolbar--card {

}
.card .card__actions {
  padding: 0 5px;
}
.content {
  padding: 0;
  background: #f2f2f2;
  margin-top: 0
}
.content label,
.content input {
  font-size: 12px;
}
.carousel {
  height: 300px;
  position: relative;
}
.img-container {
  background-color: #000;
  height: 100%;
  width: 100%;
  position: absolute;
}
.img-container .carousel {
  height: 60%;
  width: 100%;
  top:20%;
}
@media screen and (orientation:landscape) {
  .img-container .carousel {
  height: 100%;
  width: 100%;
  top: 0;
  }
}
.features{
  margin: 10px 0;
}
.features ul {
  padding-left: 0px;
  margin-top: 5px;
}
.features ul li:not(:last-child) {
  float: left;
  margin-left: 15px;
  width: 45%;
  list-style: square;
  font-family: 'Roboto', sans-serif
}
.broker-info {
  padding: 10px;
}
.broker-info .card__media__content {
  vertical-align: middle;
}
.broker-info .card__title {
  padding: 0 10px;
}
.broker-info .card__title h2 {
  font-size: 15px;
  margin-bottom: 5px;
}
.broker-info .card__title .address {
  font-size: 13px;
  line-height: 15px;
}
.footer-toolbar {
  position:fixed;
  left:0px;
  bottom:2px;
  height:inherit;
  width:100%;
  background: #f8f8f8;
  padding: 0px;
}
.footer-toolbar .container {
  padding: 4px;
  width: 100%;
  max-width: 100%;
  margin: 0
}
.container.grid-list-md .layout .flex {
  padding: 0 1px;
}
.footer-toolbar button.btn {
  margin: 0px;
  width: 100%;
  color: #fff;
}
</style>