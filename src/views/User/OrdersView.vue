<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        
        <h1 class="text-h5 mb-4">Orders</h1>

        <v-list>
          <v-list-item
            v-for="order in orders"
            :key="order.id"
          >
            <!-- CHECKBOX -->
            <template #prepend>
              <v-checkbox
                :model-value="order.done"
                @click="markDone(order)"
              ></v-checkbox>
            </template>

            <!-- ДАННЫЕ -->
            <v-list-item-title>
              {{ order.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ order.phone }}
            </v-list-item-subtitle>

            <!-- КНОПКА -->
            <template #append>
              <v-btn
                color="primary"
                :to="'/ad/' + order.adId"
              >
                Open
              </v-btn>
            </template>

          </v-list-item>
        </v-list>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: '1',
          name: 'Алан',
          phone: '+7 978 111-11-11',
          adId: '1',
          done: false
        },
        {
          id: '2',
          name: 'Пётр',
          phone: '+7 978 222-22-22',
          adId: '2',
          done: true
        },
        {
          id: '3',
          name: 'Айдер',
          phone: '+7 978 333-33-33',
          adId: '3',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone(order) {
      order.done = !order.done
      console.log('Статус заказа:', order.done)
    }
  }
}
</script>