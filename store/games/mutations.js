const mutations = {
    SET_GAMES(state, games) {
        state.games = games;
    },

    ADD_GAMES(state, gameToAdd) {
        state.games.push(gameToAdd);
    },

    DELETE_GAME(state, deletedGameID) {
        state.games = state.games.filter((filteredGames) => {
            console.log(filteredGames.id);

            return filteredGames.id !== deletedGameID;
        });
    },
};

export default mutations;
