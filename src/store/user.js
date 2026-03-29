export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },

  actions: {
    registerUser({ commit }, payload) {
      commit('setLoading', true)

      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: Math.random().toString(),
            email: payload.email
          }

          commit('setUser', user)
          commit('setLoading', false)
          resolve(user)
        }, 1000)
      })
    }
  },

  getters: {
    user(state) {
      return state.user
    }
  }
}