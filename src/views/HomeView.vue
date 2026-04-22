<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel height="450" hide-delimiter-background>
            <v-carousel-item
              v-for="moto in promoAds"
              :key="moto._id"
              :src="moto.src"
              cover
            >
              <div class="carousel-title">
                <v-btn color="red" :to="'/ad/' + moto._id">
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
          :key="moto._id"
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
                :to="'/ad/' + moto._id"
              >
                Open
              </v-btn>

              <v-btn
                color="primary"
                @click="goToBuy(moto._id)"
              >
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
import api from '@/api'

export default {
  data() {
    return {
      ads: []
    }
  },
  computed: {
    promoAds() {
      return this.ads.filter(moto => moto.promo)
    }
  },
  methods: {
    goToBuy(id) {
      this.$router.push('/ad/' + id)
    }
  },
  async mounted() {
    try {
      this.ads = await api.getAds()
    } catch (error) {
      console.error('Ошибка загрузки мотоциклов:', error)
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