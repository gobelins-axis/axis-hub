const mutations = {
    SET_LOGGED_UN_USER(state, user) {
        if (!user) {
            state.user = null;
            state.isLoggedIn = false;
            state.games = {};
        } else {
            const { uid, email, emailVerified, displayName } = user;
            state.user = { uid, email, emailVerified, name: displayName };
            state.isLoggedIn = true;
        }
    },

    SET_USER_GAMES(state, games) {
        state.games = games;
    },

    ADD_USER_GAME(state, game) {
        state.games.push(game);
    },

    REMOVE_USER_GAME(state, id) {
        state.games = state.games.filter((game) => {
            return game.id !== id;
        });
    },
};

export default mutations;
