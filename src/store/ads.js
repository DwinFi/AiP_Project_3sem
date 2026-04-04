export default {
  state: {
    ads: [
      {
        id: '1',
        title: 'Indian Chief Vintage ABS Remus',
        desc: 'Премиальный круизер с мощным двигателем.',
        promo: true,
        userId: 'logged-user',
        src: 'https://img.classistatic.de/api/v1/mo-prod/images/33/33f8b432-aeb9-48f5-83d0-519e6a2213f2?rule=mo-1600'
      },
      {
        id: '2',
        title: 'Мотоцикл OXO VENOM 300 (GN-050)',
        desc: 'Надёжный городской мотоцикл с отличной динамикой.',
        promo: true,
        userId: 'logged-user',
        src: 'https://pitbike-cross.ru/upload/iblock/43b/43b0406de433404b452e6e726b3f6173.png'
      },
      {
        id: '3',
        title: 'BMW RnineT Scrambler',
        desc: 'Стильный scrambler с классическим дизайном.',
        promo: true,
        userId: 'another-user',
        src: 'https://img.classistatic.de/api/v1/mo-prod/images/bc/bcbf1d30-bd6e-425c-9d07-c6c6eafe07f3?rule=mo-1600'
      },
      {
        id: '4',
        title: 'Питбайк TMBK PITSTER SP2 125 (17/14) Orange/Purple',
        desc: 'Компактный питбайк для бездорожья и тренировок.',
        promo: true,
        userId: 'another-user',
        src: 'https://pitbike-cross.ru/upload/iblock/feb/febde0869652626218a867db45b0880b.jpg'
      }
    ],

    orders: [] // 👈 НОВОЕ
  },

  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    updateAd(state, payload) {
      const ad = state.ads.find(item => item.id === payload.id)
      if (ad) {
        ad.title = payload.title
        ad.desc = payload.desc
      }
    },
    createOrder(state, payload) {
      state.orders.push(payload)
    }
  },

  actions: {
    createAd({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      return new Promise((resolve) => {
        setTimeout(() => {
          const newAd = {
            ...payload,
            id: Math.random().toString(),
            userId: getters.user.id
          }

          commit('createAd', newAd)
          commit('setLoading', false)
          resolve(newAd)
        }, 1000)
      })
    },

    updateAd({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      return new Promise((resolve) => {
        setTimeout(() => {
          commit('updateAd', payload)
          commit('setLoading', false)
          resolve()
        }, 1000)
      })
    },

    // 👇 НОВОЕ
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
    ads(state) {
      return state.ads
    },

    promoAds(state) {
      return state.ads.filter(ad => ad.promo)
    },

    myAds(state, getters) {
      if (!getters.user) return []
      return state.ads.filter(ad => ad.userId === getters.user.id)
    },

    adById(state) {
      return id => state.ads.find(ad => ad.id == id)
    },

    // 👇 НОВОЕ
    orders(state) {
      return state.orders
    }
  }
}