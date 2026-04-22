<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" lg="8">
        <h1 class="text-h5 mb-4 mt-4">My Motorcycles</h1>

        <v-alert
          v-if="ads.length === 0"
          type="info"
          class="mb-4"
        >
          You have no motorcycles yet.
        </v-alert>

        <v-card
          v-for="moto in ads"
          :key="moto._id"
          class="mb-4"
        >
          <v-row>
            <v-col cols="12" md="4">
              <v-img
                :src="moto.src"
                height="200"
                cover
              ></v-img>
            </v-col>

            <v-col cols="12" md="8">
              <v-card-title>{{ moto.title }}</v-card-title>

              <v-card-text>
                <p class="moto-desc">{{ moto.desc }}</p>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="text"
                  :to="'/ad/' + moto._id"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>

        <v-snackbar
          v-model="snackbar"
          color="error"
          timeout="3000"
        >
          {{ errorMessage }}
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      ads: [],
      snackbar: false,
      errorMessage: ''
    }
  },
  async mounted() {
    try {
      this.ads = await api.getMyAds()
    } catch (error) {
      this.errorMessage = error.message
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.moto-desc {
  max-height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>