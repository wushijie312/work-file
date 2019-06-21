export default {
    state: {
        role: {
            title:'请选择'
        }
    },
    getters: {
        // 类似计算属性...
    },
    mutations: {
        ['SET_ROLE'](state, role) {
            state.role = role;
        },
    },
    actions: {
        selectRole({ commit }, role) {
            commit('SET_ROLE',role);
        }
    }
}