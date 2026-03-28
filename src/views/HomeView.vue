<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel height="400">
            <v-carousel-item
              v-for="moto in promoAds"
              :key="moto.id"
              :src="moto.src"
              cover
            >
              <div class="carousel-title">
                <v-btn color="red" :to="'/ad/' + moto.id">
                  {{ moto.title }}
                </v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="moto in ads"
          :key="moto.id"
        >
          <v-card>
            <v-img
              :src="moto.src"
              height="200"
              cover
            ></v-img>

            <v-card-title>
              {{ moto.title }}
            </v-card-title>

            <v-card-text>
              {{ moto.desc }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                variant="text"
                :to="'/ad/' + moto.id"
              >
                Open
              </v-btn>

              <v-btn color="primary">
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds
    },
    ads() {
      return this.$store.getters.ads
    }
  }
}
</script>

<style scoped>
.carousel-title {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  border-radius: 10px;
}
</style>