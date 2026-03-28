import { createStore } from 'vuex'
import ads from './ads'
import user from './user'

const store = createStore({
  modules: {
    ads,
    user
  }
})

export default store