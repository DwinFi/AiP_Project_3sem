import { createStore } from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'
import orders from './orders'

const store = createStore({
  modules: {
    ads,
    user,
    shared,
    orders
  }
})

export default store