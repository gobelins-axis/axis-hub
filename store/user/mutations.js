const mutations = {
    SET_LOGGED_UN_USER(state, user) {
        if (!user) {
            state.user = null;
            state.isLoggedIn = false;
        } else {
            const {uid, email, emailVerified} = user;
            state.user = {uid, email, emailVerified};
            state.isLoggedIn = true;
        }

        console.log(state.user);
    },

    DISCONNECT(state, user) {
        state.user = null;
        state.isLoggedIn = false;
    },
};

export default mutations;
