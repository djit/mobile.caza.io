<template>
    <v-card>
      <v-card-media :src="property.images[0]" @click="showProperty(property)" height="250px">
        <div class="img-count">{{ property.images.length }}</div>
        <div class="broker-logo"><img :src="property.broker.logo" contain></div>
      </v-card-media>

      <v-card-title primary-title>
        <div>
          <h2 class="subheading mb-0">{{ property.name }}</h2>
          <span class="grey--text">{{ property.community }}</span>
        </div>
      </v-card-title>

      <v-card-actions>
        <h4 class="subheading mb-0 bold">
          AED <span class="orange-text bold">{{property.price | _number }}</span>
        </h4>
        <v-spacer></v-spacer>
        <span class="property-info">
          <v-icon>hotel</v-icon> {{ property.bedrooms }}&nbsp;&nbsp;&nbsp;<span v-if="property.parking"><v-icon>directions_car</v-icon> {{ property.parking }}&nbsp;&nbsp;&nbsp;</span>{{ property.size|_number }} sqft
        </span>
      </v-card-actions>
    </v-card>
</template>


<script>
export default {
    name: 'propertycad',
    props: ['property'],
    data() {
        return {
        }
    },
    computed: {
      logo() {
        return "https://ae.caza.io" + this.property.broker.logo
      }
    },
    methods: {
        showProperty: function(property) {
          this.$store.commit('showProperty', property)
          this.$router.push('/properties/' + property._id)
        },
    }
}
</script>


<style>
.card__actions .property-info {
  font-size: 14px;
}
.property-info  .material-icons.icon {
    font-size: 18px;
    color: #000;
    margin-top: -4px;
}
.card__media {
  position: relative;
}
.broker-logo {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
}
.broker-logo img {
  height: 100%;
}
</style>