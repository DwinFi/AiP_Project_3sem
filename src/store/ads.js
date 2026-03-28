export default {
  state: {
    ads: [
      {
        id: '1',
        title: 'Indian Chief Vintage ABS Remus',
        desc: 'Премиальный круизер с мощным двигателем.',
        promo: true,
        src: 'https://img.classistatic.de/api/v1/mo-prod/images/33/33f8b432-aeb9-48f5-83d0-519e6a2213f2?rule=mo-1600'
      },
      {
        id: '2',
        title: 'Мотоцикл OXO VENOM 300 (GN-050)',
        desc: 'Надёжный городской мотоцикл с отличной динамикой.',
        promo: true,
        src: 'https://pitbike-cross.ru/upload/iblock/43b/43b0406de433404b452e6e726b3f6173.png'
      },
      {
        id: '3',
        title: 'BMW RnineT Scrambler',
        desc: 'Стильный scrambler с классическим дизайном.',
        promo: true,
        src: 'https://img.classistatic.de/api/v1/mo-prod/images/bc/bcbf1d30-bd6e-425c-9d07-c6c6eafe07f3?rule=mo-1600'
      },
      {
        id: '4',
        title: 'Питбайк TMBK PITSTER SP2 125 (17/14) Orange/Purple',
        desc: 'Компактный питбайк для бездорожья и тренировок.',
        promo: true,
        src: 'https://pitbike-cross.ru/upload/iblock/feb/febde0869652626218a867db45b0880b.jpg'
      }
    ]
  },

  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    }
  },

  actions: {
    createAd({ commit }, payload) {
      payload.id = Math.random().toString()
      commit('createAd', payload)
    }
  },

  getters: {
    ads(state) {
      return state.ads
    },

    promoAds(state) {
      return state.ads.filter(ad => ad.promo)
    },

    myAds(state) {
      return state.ads
    },

    adById(state) {
      return id => {
        return state.ads.find(ad => ad.id == id)
      }
    }
  }
}