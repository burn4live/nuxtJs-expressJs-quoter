<template>
  <v-layout>
    <v-flex class="mt-6" xs12>
      <v-card
        raised
        max-width="650"
        min-height="400"
        class="mx-auto"
      >
        <v-btn
          :to="'/quote/'+profile._id+'/edit'"
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
        <v-flex xs12>
          <v-divider class="my-2" />
        </v-flex>
        <v-layout wrap>
          <v-flex xs12 text-center>
            <v-text-field v-model="profile.name" label="Name" />
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="profile.email" label="Email" />
          </v-flex>
          <v-flex xs6>
            <v-text-field v-model="profile.phone" label="Phone #" />
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="profile.location.address" label="Address" />
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="profile.description" label="Description" />
          </v-flex>
          <v-flex class="mt-6" xs12 text-center>
            <v-btn @click="update" color="green darken-3">
              Update Profile
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
      profile: {
        name: '',
        description: '',
        location: {
          address: ''
        },
        phone: '',
        email: ''
      }
    }
  },
  created () {
    this.$axios.get('/api/profile').then((res) => {
      this.profile.name = res.data.name
      this.profile.description = res.data.description
      this.profile.location.address = res.data.location.address
      this.profile.email = res.data.email
      this.profile.phone = res.data.phone
    })
  },
  methods: {
    update () {
      this.$axios.post('/api/edit/profile', this.profile).then((res) => {
        this.profile.name = res.data.name
        this.profile.description = res.data.description
        this.profile.location.address = res.data.location.address
        this.profile.email = res.data.email
        this.profile.phone = res.data.phone
      })
    }
  }
}
</script>
