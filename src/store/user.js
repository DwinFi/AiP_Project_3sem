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
      const user = {
        id: Math.random().toString(),
        email: payload.email
      }

      commit('setUser', user)
    }
  },

  getters: {
    user(state) {
      return state.user
    }
  }
}