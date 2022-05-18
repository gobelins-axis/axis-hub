// Vendor
import * as firebase from 'firebase/auth';
import { mapGetters } from 'vuex';
import { signOut } from 'firebase/auth';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [pageTransitions],

    computed: {
        ...mapGetters({
            isUserLoggedIn: 'user/isLoggedIn',
        }),

    },

    mounted() {
        signOut(this.$firebase.auth);
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
