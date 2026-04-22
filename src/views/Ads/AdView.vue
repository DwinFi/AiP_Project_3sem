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
              @click="dialogEdit = true"
            >
              Edit
            </v-btn>

            <v-btn color="green" @click="dialogBuy = true">
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="error" class="mt-5">
          Motorcycle not found
        </v-alert>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogEdit" width="500">
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

          <v-btn variant="text" @click="dialogEdit = false">
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

    <v-dialog v-model="dialogBuy" width="500">
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

          <v-btn variant="text" @click="dialogBuy = false">
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

    <v-snackbar
      v-model="snackbar"
      color="error"
      timeout="3000"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  props: ['id'],
  data() {
    return {
      ad: null,
      loading: false,
      snackbar: false,
      errorMessage: '',
      dialogEdit: false,
      dialogBuy: false,
      editedTitle: '',
      editedDesc: '',
      name: '',
      phone: '',
      currentUser: null
    }
  },
  computed: {
    canEdit() {
      return this.currentUser && this.ad && this.currentUser.id === this.ad.userId
    }
  },
  watch: {
    dialogEdit(value) {
      if (value && this.ad) {
        this.editedTitle = this.ad.title
        this.editedDesc = this.ad.desc
      }
    }
  },
  methods: {
    async loadAd() {
      try {
        this.ad = await api.getAd(this.id)
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      }
    },
    async saveChanges() {
      this.loading = true

      try {
        this.ad = await api.updateAd(this.id, {
          title: this.editedTitle,
          desc: this.editedDesc
        })
        this.dialogEdit = false
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      } finally {
        this.loading = false
      }
    },
    async createOrder() {
      this.loading = true

      try {
        await api.createOrder({
          name: this.name,
          phone: this.phone,
          adId: this.id
        })

        this.name = ''
        this.phone = ''
        this.dialogBuy = false
        this.$router.push('/orders')
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    const user = localStorage.getItem('user')
    this.currentUser = user ? JSON.parse(user) : null
    this.loadAd()
  }
}
</script>