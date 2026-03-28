<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <h1 class="text-h5 mb-4 mt-4">Create Motorcycle</h1>

        <v-form v-model="valid" ref="form" validate-on="input">
          <v-text-field
            name="title"
            label="Motorcycle Title"
            type="text"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>

          <v-textarea
            name="description"
            label="Motorcycle Description"
            v-model="description"
            :rules="[v => !!v || 'Description is required']"
            class="mb-3"
          ></v-textarea>
        </v-form>

        <v-row>
          <v-col cols="12">
            <v-btn class="mt-3" color="warning">
              Upload
              <v-icon end>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <img
              src="https://img.classistatic.de/api/v1/mo-prod/images/bc/bcbf1d30-bd6e-425c-9d07-c6c6eafe07f3?rule=mo-1600"
              height="150"
              class="mt-3"
              alt="preview"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="promo"
              label="Show motorcycle in promo carousel?"
            ></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-btn
              color="success"
              @click="createAd"
              :disabled="!valid"
            >
              Create Motorcycle
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      title: '',
      description: '',
      promo: true
    }
  },
  methods: {
    async createAd() {
      const result = await this.$refs.form.validate()

      if (result.valid) {
        const ad = {
          title: this.title,
          desc: this.description,
          promo: this.promo,
          src: 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        }

        this.$store.dispatch('createAd', ad)

        this.title = ''
        this.description = ''
        this.promo = true
        this.$refs.form.resetValidation()

        this.$router.push('/list')
      }
    }
  }
}
</script>