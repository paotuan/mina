import Vue from 'vue'
import Vuex from 'vuex'
import conversation from './modules/conversation.js'
import group from './modules/group'
import user from './modules/user'
import global from './modules/global'
import game from './modules/game'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    conversation,
    group,
    user,
    global,
    game
  }
})
