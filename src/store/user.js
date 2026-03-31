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
      commit('clearError')
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
    },

    loginUser({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (payload.email === 'test@test.com' && payload.password === '123456') {
            const user = {
              id: 'logged-user',
              email: payload.email
            }

            commit('setUser', user)
            commit('setLoading', false)
            resolve(user)
          } else {
            commit('setLoading', false)
            commit('setError', 'Неверный email или пароль')
            reject(new Error('Login failed'))
          }
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