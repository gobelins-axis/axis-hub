const actions = {
    setLoggedInUser({ commit }, user) {
        commit('SET_LOGGED_UN_USER', user);
    },

    setGames({ commit }, games) {
        commit('SET_USER_GAMES', games);
    },

    addGame({ commit }, game) {
        commit('ADD_USER_GAME', game);
    },

    removeGame({ commit }, game) {
        commit('REMOVE_USER_GAME', game);
    },

};

export default actions;
