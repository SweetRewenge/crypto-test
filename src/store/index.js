import Vue from 'vue'
import Vuex from 'vuex'

import markets from './markets'
import exchanges from './exchanges'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markets,
    exchanges,
  },
})
