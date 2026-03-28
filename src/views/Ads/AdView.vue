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
            <v-btn color="orange">
              Edit
            </v-btn>
            <v-btn color="green">
              Buy
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-alert v-else type="error" class="mt-5">
          Motorcycle not found
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    ad() {
      return this.$store.getters.adById(this.id)
    }
  }
}
</script>