const actions = {
    setLoggedInUser: ({ commit }, user) => {
        commit('SET_LOGGED_UN_USER', user);
    },

    disconnect: ({ commit }) => {
        commit('DISCONNECT');
    },

    setGames: ({ commit }, games) => {
        commit('SET_USER_GAMES', games);
    },

};

export default actions;
