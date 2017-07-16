const state = {
    dialogGraph: false,
    adminTitle: ''
}

const getters = {
}

const actions = {
    changeAdminTitle ({commit}, data) {
        commit('CHANGE_ADMIN_TITLE', data)
    }
}

const mutations = {
    'CHANGE_ADMIN_TITLE' (state, res) {
        state.adminTitle = res
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
