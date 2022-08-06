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

    DISCONNECT(state) {
        state.user = null;
        state.isLoggedIn = false;
        state.games = {};
    },

    SET_USER_GAMES(state, games) {
        state.games = games;
    },

    ADD_USER_GAME(state, game) {
        state.games.push(game);
    },

    REMOVE_USER_GAME(state, game) {
        state.games = state.games.filter((filteredGames) => {
            return filteredGames.id !== game;
        });
    },
};

export default mutations;
