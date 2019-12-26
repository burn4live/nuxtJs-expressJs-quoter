<template>
  <v-layout>
    <v-flex class="mt-6" xs12>
      <v-card
        raised
        max-width="650"
        min-height="400"
        class="mx-auto"
      >
        <v-flex xs12>
          <v-card class="ma-2" raised>
            <v-layout>
              <v-flex xs4>
                <v-avatar
                  class="profile mt-n6"
                  color="grey"
                  size="130"
                  rounded
                >
                  <v-img src="" />
                </v-avatar>
              </v-flex>
              <v-flex xs8 text-right class="pa-2">
                <v-list>
                  <v-list-item-content>
                    <v-list-item-title>{{ profile.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ profile.location.address }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ profile.phone }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-btn
          :to="'/quote/'+quote._id+'/edit'"
          color="amber accent-4"
          style="opacity: 0.7;"
          dark
          absolute
          middle
          right
          fab
          large
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-layout wrap>
          <v-flex xs12 text-center>
            <h1>{{ quote.clientName }}</h1>
          </v-flex>
          <v-flex xs12>
            <v-divider class="my-6" />
          </v-flex>
          <v-flex xs12>
            <v-card min-height="50" class="my-2" shaped>
              {{ quote.description }}
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-data-table
              :headers="headers"
              :items="quote.items"
              class="elevation-1"
            />
          </v-flex>
          <v-flex class="mt-6" xs12 text-center>
            <v-btn color="green darken-3">
              Send to email
            </v-btn>
            <v-btn color="blue darken-3">
              Send Sms
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      quote: {},
      profile: {
        name: '',
        description: '',
        location: {
          address: ''
        },
        phone: '',
        email: ''
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Description', value: 'description' },
        { text: 'price', value: 'price' }
      ]
    }
  },
  created () {
    this.$axios.get(`/api/quote/${this.$route.params.id}`).then((res) => {
      this.quote = res.data
    }).catch((e) => {
      this.router.push('/quotes')
    })
    this.$axios.get('/api/profile').then((res) => {
      this.profile.name = res.data.name
      this.profile.description = res.data.description
      this.profile.location.address = res.data.location.address
      this.profile.email = res.data.email
      this.profile.phone = res.data.phone
    })
  }
}
</script>
