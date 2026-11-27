// Vendor
import { mapGetters } from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Sections
import SectionHero from '@/sections/home/SectionHero';
import SectionGames from '@/sections/home/SectionGames';

// Components
import Footer from '@/components/Footer';

const MAX_GAMES = 6;

export default {
    name: 'page-home',

    mixins: [seo, pageTransitions],

    computed: {
        ...mapGetters({
            allGames: 'games/games',
        }),

        games() {
            return this.allGames.slice(0, MAX_GAMES);
        },
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
    },

    components: {
        SectionHero,
        SectionGames,
        Footer,
    },
};
