const getters = {
    isLoggedIn(state) {
        return state.isLoggedIn;
    },

    user(state) {
        return state.user;
    },

    games(state) {
        return state.games;
    },
};

export default getters;
