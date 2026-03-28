<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" lg="8">
        <h1 class="text-h5 mb-4 mt-4">My Motorcycles</h1>

        <v-card
          v-for="moto in myAds"
          :key="moto.id"
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
                  :to="'/ad/' + moto.id"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds
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