// Vendor
import { mapGetters } from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import ListUserGames from '@/components/ListUserGames';
import Footer from '@/components/Footer';

export default {
    name: 'page-hub',

    mixins: [seo, pageTransitions],

    computed: {
        ...mapGetters({
            games: 'user/games',
        }),
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
    },

    components: {
        ListUserGames,
        Footer,
    },
};
