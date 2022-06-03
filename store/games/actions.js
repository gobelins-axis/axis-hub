const actions = {
    setGames: ({ commit }, games) => {
        commit('SET_GAMES', games);
    },

    deleteGame: ({ commit }, gameID) => {
        commit('DELETE_GAME', gameID);
    },

};

export default actions;
