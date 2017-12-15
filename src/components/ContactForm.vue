<template>
  <v-layout row justify-center>
      <v-card class="contactform" v-if="showForm">
        <v-card-title>
          <span class="title">{{ property.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
              <v-form v-model="valid" ref="form" lazy-validation>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Fullname"
                    v-model="name"
                    :rules="nameRules"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Phone"
                    v-model="phone"
                    :rules="phoneRules"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    required>
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Message"
                    v-model="text"
                    required
                    textarea
                    rows="10">
                  </v-text-field>
                </v-flex>
                <v-flex xs12>
                  <small>*required field</small>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="" @click.native="close">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.native="submit">Send</v-btn>
        </v-card-actions>
      </v-card>

      <v-layout v-if="success" row justify-center class="message">
        <v-container grid-list-xs>
        <v-flex xs12 class="text-xs-center">
          <v-icon color="green" x-large>check_circle</v-icon>
        </v-flex>
        <v-flex xs12 class="text-xs-center mt-2">
          Your message has been sent.<br>Thank you.
        </v-flex>
        <v-flex xs12 class="text-xs-center mt-5">
          <v-btn color="primary" @click.native="close">Close</v-btn>
        </v-flex>
      </v-container>
      </v-layout>

  </v-layout>
</template>


<script>
export default {
  name: 'contactform',
  props: ['property', 'property_id'],
  data () {
    return {
      name: '',
      phone: '',
      email: '',
      text: 'I am interested in viewing this property:\n\n"' + this.property.title + '"\n\nThank you.',
      valid: true,
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      phoneRules: [
        (v) => !!v || 'Phone is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        //(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      showForm: true,
      success: false,
      token: this.$store.state.token
    }
  },
  methods: {
    close() {
      this.$store.commit('closeContact')
    },
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        var qs = 'name=' + this.name + '&phone=' + this.phone + '&email=' + this.email + '&text=' + this.text + '&property_id=' + this.property_id + '&cc=' + this.cc
        axios({
          method: 'POST',
          url: API_ENDPOINT,
          data: qs,
        })
        .then(response => {
          //console.log(response)
          if(response.data == 'success') {
            this.showForm = false
            this.success = true
          }
        })
        .catch(error => {
          console.log(error)
          return
        }) 
      }
    }
  }
}
</script>


<style>
.application--light .input-group label,
.application--light .input-group input,
.application--light .input-group textarea {
  font-size: 14px;
}
.card__title .title {
  font-size: 14px;
}
.message {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>