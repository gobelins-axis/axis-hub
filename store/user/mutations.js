const mutations = {
    SET_LOGGED_UN_USER(state, user) {
        if (!user) {
            state.user = null;
            state.isLoggedIn = false;
        } else {
            const {uid, email, emailVerified, displayName} = user;
            state.user = {uid, email, emailVerified, name: displayName};
            state.isLoggedIn = true;
        }
    },

    DISCONNECT(state, user) {
        state.user = null;
        state.isLoggedIn = false;
    },
};

export default mutations;
