const mutations = {
    SET_GAMES(state, games) {
        state.games = games
    },

    DELETE_GAME(state, deletedGameID) {
        console.log(state)
        console.log('deleted', deletedGameID)

        state.games = state.games.filter(filteredGames => {
            console.log(filteredGames.id)

            return filteredGames.id !== deletedGameID
        })

    },
};

export default mutations;
