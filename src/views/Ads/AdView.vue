<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5" v-if="ad">
          <v-img
            height="400"
            :src="ad.src"
            cover
          ></v-img>

          <v-card-text>
            <h1 class="text-h4 mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="orange"
              v-if="canEdit"
              @click="dialog = true"
            >
              Edit
            </v-btn>

            <v-btn color="green" @click="buyDialog = true">
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="error" class="mt-5">
          Motorcycle not found
        </v-alert>
      </v-col>
    </v-row>

    <!-- EDIT DIALOG -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6">
          Edit motorcycle
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Motorcycle title"
            v-model="editedTitle"
          ></v-text-field>

          <v-textarea
            label="Motorcycle description"
            v-model="editedDesc"
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            @click="saveChanges"
            :loading="loading"
            :disabled="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- BUY DIALOG -->
    <v-dialog v-model="buyDialog" width="500">
      <v-card>
        <v-card-title class="text-h6">
          Buy motorcycle
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Your name"
            v-model="name"
          ></v-text-field>

          <v-text-field
            label="Phone"
            v-model="phone"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="buyDialog = false">
            Cancel
          </v-btn>

          <v-btn
            color="green"
            @click="createOrder"
            :loading="loading"
            :disabled="loading"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      buyDialog: false,
      editedTitle: '',
      editedDesc: '',
      name: '',
      phone: ''
    }
  },
  computed: {
    ad() {
      return this.$store.getters.adById(this.id)
    },
    loading() {
      return this.$store.getters.loading
    },
    user() {
      return this.$store.getters.user
    },
    canEdit() {
      return this.user && this.ad && this.user.id === this.ad.userId
    }
  },
  watch: {
    dialog(value) {
      if (value && this.ad) {
        this.editedTitle = this.ad.title
        this.editedDesc = this.ad.desc
      }
    }
  },
  methods: {
    async saveChanges() {
      await this.$store.dispatch('updateAd', {
        id: this.ad.id,
        title: this.editedTitle,
        desc: this.editedDesc
      })

      this.dialog = false
    },
    async createOrder() {
      await this.$store.dispatch('createOrder', {
        name: this.name,
        phone: this.phone,
        adId: this.ad.id
      })

      this.name = ''
      this.phone = ''
      this.buyDialog = false
    }
  }
}
</script>