// Vendor
import { mapGetters } from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import CardGameDetails from '@/components/CardGameDetails';
import NavigationGames from '@/components/NavigationGames';
import ButtonBack from '@/components/ButtonBack';
import Footer from '@/components/Footer';

export default {
    mixins: [seo, pageTransitions],

    data() {
        return {};
    },

    computed: {
        ...mapGetters({
            games: 'games/games',
        }),

        game() {
            const game = this.games.find((item) => {
                return item.id === this.$route.params.id;
            });

            return game;
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
        CardGameDetails,
        NavigationGames,
        ButtonBack,
        Footer,
    },

    validate({ params, store }) {
        return store.state.games.games.some(game => game.id === params.id);
    },
};
