<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <h1 class="text-h5 mb-4 mt-4">Create Motorcycle</h1>

        <v-form v-model="valid" ref="form" validate-on="input">
          <v-text-field
            label="Motorcycle Title"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>

          <v-textarea
            label="Motorcycle Description"
            v-model="desc"
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>

          <v-file-input
            label="Motorcycle image"
            accept="image/*"
            prepend-icon="mdi-camera"
            v-model="image"
            :rules="[v => !!v || 'Image is required']"
          ></v-file-input>

          <v-switch
            v-model="promo"
            label="Show motorcycle in promo carousel?"
          ></v-switch>
        </v-form>

        <v-btn
          color="success"
          @click="createAd"
          :loading="loading"
          :disabled="!valid || loading"
        >
          Create Motorcycle
        </v-btn>

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
      valid: false,
      loading: false,
      snackbar: false,
      errorMessage: '',
      title: '',
      desc: '',
      promo: true,
      image: null
    }
  },
  methods: {
    async createAd() {
      const result = await this.$refs.form.validate()
      if (!result.valid) return

      this.loading = true

      try {
        const formData = new FormData()
        formData.append('title', this.title)
        formData.append('desc', this.desc)
        formData.append('promo', this.promo)

        if (this.image) {
          formData.append('image', this.image)
        }

        await api.createAd(formData)
        this.$router.push('/list')
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>