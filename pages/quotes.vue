<template>
  <v-layout wrap>
    <v-flex v-for="quote in quotes" :key="quote._id" class="ma-2" xs4>
      <v-card
        :to="'/quote/'+ quote._id"
        min-width="300"
        min-height="100"
        raised
      >
        <v-card>
          {{ quote.clientName }}
        </v-card>
        {{ quote.description }}
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      quotes: []
    }
  },
  created () {
    this.$axios.$get('/api/fetch').then((res) => {
      this.quotes = res
    })
  }
}
</script>
