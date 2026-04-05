export default {
  state: {
    orders: []
  },

  mutations: {
    createOrder(state, payload) {
      state.orders.push(payload)
    }
  },

  actions: {
    createOrder({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      return new Promise((resolve) => {
        setTimeout(() => {
          const order = {
            ...payload,
            id: Math.random().toString(),
            done: false
          }

          commit('createOrder', order)
          commit('setLoading', false)
          resolve(order)
        }, 1000)
      })
    }
  },

  getters: {
    orders(state) {
      return state.orders
    }
  }
}