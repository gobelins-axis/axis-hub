// Vendor
import { signOut } from 'firebase/auth';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [seo, pageTransitions],

    data() {
        return {};
    },

    mounted() {
        this.logout();
    },

    methods: {
        /**
         * Public
         */
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },

        /**
         * Private
         */
        logout() {
            signOut(this.$firebase.auth)
                .then(this.logoutSuccessHandler)
                .catch(this.logoutFailedHandler);
        },

        logoutSuccessHandler() {
            this.$router.push(this.localePath('/'));
        },

        logoutFailedHandler() {
            this.$router.push(this.localePath('/'));
        },
    },
};
