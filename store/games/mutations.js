const mutations = {
    SET_GAMES(state, games) {
        state.games = games;
    },

    ADD_GAME(state, game) {
        state.games.push(game);
    },

    REMOVE_GAME(state, gameID) {
        state.games = state.games.filter((filteredGames) => {
            return filteredGames.id !== gameID;
        });
    },
};

export default mutations;
