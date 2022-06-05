const actions = {
    setLoggedInUser: ({ commit }, user) => {
        commit('SET_LOGGED_UN_USER', user);
    },

    disconnect: ({ commit }) => {
        commit('DISCONNECT');
    },

};

export default actions;
