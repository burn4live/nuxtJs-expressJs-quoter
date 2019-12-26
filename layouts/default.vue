<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation
      dark
      shift
      app
    >
      <v-btn to="/quotes">
        <span>Quotes</span>
        <v-icon>mdi-post</v-icon>
      </v-btn>

      <v-btn to="/quote/create">
        <span>Create</span>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>

      <v-btn to="/profile">
        <span>Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
