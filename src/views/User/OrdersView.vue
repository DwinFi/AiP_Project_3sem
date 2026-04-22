<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="6">
        <h1 class="text-h5 mb-4">Orders</h1>

        <v-alert
          v-if="orders.length === 0"
          type="info"
          class="mb-4"
        >
          No orders yet.
        </v-alert>

        <v-list v-else>
          <v-list-item
            v-for="order in orders"
            :key="order._id"
          >
            <template #prepend>
              <v-checkbox
                :model-value="order.done"
                @click="toggleDone(order)"
              ></v-checkbox>
            </template>

            <v-list-item-title>
              {{ order.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ order.phone }}
            </v-list-item-subtitle>

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
      orders: [],
      snackbar: false,
      errorMessage: ''
    }
  },
  methods: {
    async loadOrders() {
      try {
        this.orders = await api.getOrders()
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      }
    },
    async toggleDone(order) {
      try {
        const updated = await api.updateOrderStatus(order._id, !order.done)
        order.done = updated.done
      } catch (error) {
        this.errorMessage = error.message
        this.snackbar = true
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>