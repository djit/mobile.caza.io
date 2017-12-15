<template>
    <!--v-card>
      <v-card-media :src="property.images[0]" @click="showProperty(property)" height="250px">
        <div class="img-count">{{ property.images.length }}</div>
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
      </v-card-actions>
    </v-card-->

    <v-card>
        <v-layout row wrap>
            <v-flex xs4>
                <v-card-media :src="property.thumbs[0]" @click="showProperty(property)" height="100%"></v-card-media>
                <div class="img-count">{{ property.images.length }}</div>
            </v-flex>
            <v-flex xs8  @click="showProperty(property)">
                <v-card-title>
                    <h2 class="">{{ property.name }}</h2>
                    <span class="grey--text">{{ property.community }}</span>
                </v-card-title>
                <v-card-text>
                    <span class="price">
                        AED <span class="orange-text bold">{{property.price | _number }}</span>
                    </span><br>
                    <span class="property-info">
                        <v-icon>hotel</v-icon> {{ property.bedrooms }}&nbsp;&nbsp;&nbsp;
                        <span v-if="property.parking"><v-icon>directions_car</v-icon> {{ property.parking }}&nbsp;&nbsp;&nbsp;</span>
                        {{ property.size|_number }} sqft
                    </span>
                </v-card-text>
            </v-flex>
        </v-layout>

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
    methods: {
        showProperty: function(property) {
          this.$store.commit('showProperty', property)
          this.$router.push('/properties/' + property._id)
        },
    }
}
</script>


<style scoped>
.layout.wrap {
    height: 100%;
}
.card__title {
    padding: 5px 10px;
}
.card__title h2 {
    font-size: 16px;
    margin: 0;
    width: 100%;
    height: 21px;
    overflow-y: hidden;
}
.card__text {
    margin-top: 5px;
}
.price {
    font-size: 14px;
    font-weight: bold;
    width: 100%;
}
.property-info .material-icons.icon {
    margin-top: -4px;
}
.material-icons.icon {
    font-size: 16px;
    color: #000;
}
</style>