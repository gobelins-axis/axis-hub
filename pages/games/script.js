// Vendor
import { mapGetters } from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import ListGames from '@/components/ListGames';
import Footer from '@/components/Footer';

export default {
    name: 'page-games',

    mixins: [seo, pageTransitions],

    computed: {
        ...mapGetters({
            games: 'games/games',
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
        ListGames,
        Footer,
    },
};
