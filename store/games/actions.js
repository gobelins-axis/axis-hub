const actions = {
    setGames: ({ commit }, games) => {
        commit('SET_GAMES', games);
    },

    addGames: ({ commit }, gameToAdd) => {
        commit('ADD_GAMES', gameToAdd);
    },

    deleteGame: ({ commit }, gameID) => {
        commit('DELETE_GAME', gameID);
    },

};

export default actions;
