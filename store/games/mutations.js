const mutations = {
    SET_GAMES(state, games) {
        if (!user) {
            state.user = false;
            state.isLoggedIn = false;
        } else {
            const {uid, email, emailVerified} = user;
            state.user = {uid, email, emailVerified};
            state.isLoggedIn = true;
        }

        console.log(state.user);
    },

    DELETE_GAME(state, deletedGameID) {
        state.games = state.games.filter(filteredGames => {
            return filteredGames.id !== deletedGameID
        })
    },
};

export default mutations;
