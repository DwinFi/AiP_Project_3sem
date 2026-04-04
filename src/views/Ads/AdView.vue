<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mt-5" v-if="ad">
          <v-img height="400" :src="ad.src" cover></v-img>

          <v-card-text>
            <h1 class="text-h4 mb-3">{{ ad.title }}</h1>
            <p>{{ ad.desc }}</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="orange"
              v-if="canEdit"
              @click="dialogEdit = true"
            >
              Edit
            </v-btn>

            <v-btn color="green" @click="dialogBuy = true">
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- BUY DIALOG -->
    <v-dialog v-model="dialogBuy" width="500">
      <v-card>
        <v-card-title>Buy motorcycle</v-card-title>

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

          <v-btn variant="text" @click="dialogBuy = false">
            Cancel
          </v-btn>

          <v-btn
            color="primary"
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
      dialogBuy: false,
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
  methods: {
    async createOrder() {
      await this.$store.dispatch('createOrder', {
        name: this.name,
        phone: this.phone,
        adId: this.ad.id
      })

      this.name = ''
      this.phone = ''
      this.dialogBuy = false
    }
  }
}
</script>