const actions = {
    setGames({ commit }, games) {
        commit('SET_GAMES', games);
    },

    addGame({ commit }, game) {
        commit('ADD_GAME', game);
    },

    removeGame({ commit }, gameID) {
        commit('REMOVE_GAME', gameID);
    },

};

export default actions;
