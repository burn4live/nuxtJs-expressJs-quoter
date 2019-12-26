<template>
  <v-container>
    <v-layout wrap>
      <v-card
        elevation="22"
        max-width="650"
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
        <v-card class="pa-2 mt-4" raised>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-layout wrap>
              <v-flex xs12 sm4 pr-2>
                <v-text-field v-model="info.clientName" class="purple-input" label="Client Name" counter="40" />
              </v-flex>
              <v-flex xs12 sm4 pr-2>
                <v-text-field v-model="info.phone" class="purple-input" label="Client Phone Number" />
              </v-flex>
              <v-flex xs12 sm4 pr-2>
                <v-text-field v-model="info.email" class="purple-input" label="Client Email" />
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="info.location.address" class="purple-input" label="Client Address" />
              </v-flex>
              <!-- <v-flex xs10 sm5 pb-5 pl-sm-5> -->
              <!-- <gmap-autocomplete
                      :value="info.location.address"
                      :select-first-on-enter="true"
                      @place_changed="setPlace"
                      class="gmap v-input__slot v-text-field"
                      placeholder="Project Location"
                    /> -->
              <!-- </v-flex> -->
              <v-flex xs12>
                <v-textarea
                  v-model="info.description"
                  label="Details"
                  solo
                  outlined
                  class="purple-input"
                  counter="400"
                />
              </v-flex>
              <v-flex xs12>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>Items</v-toolbar-title>
                      <v-divider
                        class="mx-4"
                        inset
                        vertical
                      />
                      <v-spacer />
                      <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                          <v-btn v-on="on" color="primary" dark class="mb-2">
                            New Item
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                          </v-card-title>

                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.name" label="Name" />
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.description" label="Description" />
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.price" label="Price" />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer />
                            <v-btn @click="close" color="blue darken-1" text>
                              Cancel
                            </v-btn>
                            <v-btn @click="save" color="blue darken-1" text>
                              Save
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      @click="editItem(item)"
                      small
                      class="mr-2"
                    >
                      edit
                    </v-icon>
                    <v-icon
                      @click="deleteItem(item)"
                      small
                    >
                      delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-flex>
              <v-flex xs12 justify-center text-center>
                <v-btn @click="create" class="mx-0 font-weight-light" color="yellow darken-4">
                  Edit Project
                </v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-card>
    </v-layout>
  </v-container>
</template>
<style>
.gmap {
  color: white !important;
  padding-top: 16px;
  border-bottom: 2px solid grey;
  background-color: transparent;
}

</style>
<script>
export default {
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      defaultItem: {
        name: '',
        description: '',
        price: 0
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
      ],
      info: {
        clientName: '',
        phone: '',
        user: '',
        email: '',
        description: '',
        location: {
          lat: '',
          lng: '',
          address: '',
          country: '',
          city: '',
          province: '',
          url: ''
        },
        createdBy: '',
        items: []
      },
      items: [],
      editedItem: {
        name: '',
        description: '',
        price: ''
      },
      quote: {},
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
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.$axios.get(`/api/quote/${this.$route.params.id}`).then((res) => {
      this.quote = res.data
      this.info.clientName = res.data.clientName
      this.info.phone = res.data.phone
      this.info.email = res.data.email
      this.info.location.address = res.data.location.address
      this.info.createdBy = res.data.createdBy
      this.items = res.data.items
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
  },
  methods: {
    create () {
      if (this.$refs.form.validate()) {
        this.info.user = '1234'
        this.info.items = this.items
        this.$axios.$post(`api/edit/quote/${this.quote._id}`, this.info).then((res) => {
          //  direct to quotes page
          this.$router.push(`/quotes`)
        })
      }
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
