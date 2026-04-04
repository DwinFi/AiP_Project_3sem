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
            <template #prepend>
              <v-checkbox
                :model-value="order.done"
              ></v-checkbox>
            </template>

            <v-list-item-title>
              {{ order.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ order.phone }}
            </v-list-item-subtitle>

            <template #append>
              <v-btn :to="'/ad/' + order.adId">
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
  computed: {
    orders() {
      return this.$store.getters.orders
    }
  }
}
</script>