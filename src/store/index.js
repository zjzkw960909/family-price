import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import graph from './modules/graph'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        global,
        graph
    }
})
