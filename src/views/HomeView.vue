<template>
  <div>
    <!-- КАРУСЕЛЬ -->
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel height="400">
            <v-carousel-item
              v-for="moto in motorcycles"
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

    <!-- СЕТКА -->
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="moto in motorcycles"
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
  data() {
    return {
      motorcycles: [
  {
    id: '1',
    title: 'Indian Chief Vintage ABS Remus',
    desc: 'Премиальный круизер с мощным двигателем',
    promo: true,
    src: 'https://img.classistatic.de/api/v1/mo-prod/images/33/33f8b432-aeb9-48f5-83d0-519e6a2213f2?rule=mo-1600'
  },
  {
    id: '2',
    title: 'Мотоцикл OXO VENOM 300 (GN-050)',
    desc: 'Надёжный городской мотоцикл с отличной динамикой',
    promo: true,
    src: 'https://pitbike-cross.ru/upload/iblock/43b/43b0406de433404b452e6e726b3f6173.png'
  },
  {
    id: '3',
    title: 'BMW RnineT Scrambler',
    desc: 'Стильный scrambler с классическим дизайном',
    promo: true,
    src: 'https://img.classistatic.de/api/v1/mo-prod/images/bc/bcbf1d30-bd6e-425c-9d07-c6c6eafe07f3?rule=mo-1600'
  },
  {
    id: '4',
    title: 'Питбайк TMBK PITSTER SP2 125 (17/14) Orange/Purple',
    desc: 'Компактный питбайк для бездорожья и тренировок',
    promo: true,
    src: 'https://pitbike-cross.ru/upload/iblock/feb/febde0869652626218a867db45b0880b.jpg'
  }
  
]
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
  background: rgba(0,0,0,0.6);
  padding: 10px 20px;
  border-radius: 10px;
}
</style>