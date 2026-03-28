import { createStore } from 'vuex'
import ads from './ads'

const store = createStore({
  modules: {
    ads
  }
})

export default store