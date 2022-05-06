// Vendor
import * as firebase from 'firebase/auth';
import { mapGetters } from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [seo, pageTransitions],

    computed: {
        ...mapGetters({
            isUserLoggedIn: 'user/isLoggedIn',
        }),
    },

    mounted() {
        if (this.isUserLoggedIn) return;

        const ui = new this.$firebaseui.auth.AuthUI(this.$firebase.auth);

        ui.start(
            this.$refs.firebaseLoginContainer,
            {
                signInOptions: [
                    {
                        provider: firebase.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: true,
                    },
                    {
                        provider: firebase.GoogleAuthProvider.PROVIDER_ID,
                        requireDisplayName: true,
                    },
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (authResult) => {
                        console.log(authResult);
                        return false;
                    },
                },
            },
        );
    },

    methods: {
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },
    },
};
