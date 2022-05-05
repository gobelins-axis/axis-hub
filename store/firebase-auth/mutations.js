const mutations = {
    SET_LOGGED_UN_USER(state, user) {
        if (!user) {
            state.user = false;
            state.isLoggedIn = false;
        } else {
            const { uid, email, emailVerified } = user;
            state.user = { uid, email, emailVerified };
            state.isLoggedIn = true;
        }

        console.log(state.user);
    },
};

export default mutations;
