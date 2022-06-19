// Vendor
import GameCard from '@/components/GameCard';
import ButtonLink from '@/components/ButtonLink';
import Filters from '@/components/Filters';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';
import {mapGetters} from "vuex";

export default {
    mixins: [seo, pageTransitions],

    components: {
        GameCard,
        ButtonLink,
        Filters
    },

    data() {
        return {
            gamesList: this.$store.state.games.games
        }
    },

    computed: {
        getNumberOfEmpty() {
            if (this.gamesList.length === 0) return 9
            else {
                switch (this.gamesList.length % 3) {
                    case 0:
                        return 3;
                        break
                    case 1:
                        return 5;
                        break;
                    case 2:
                        return 4;
                        break;
                }
            }
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

        setFilter(str) {
            console.log('oui')
            switch (str) {
                case 'all':
                    this.gamesList = this.$store.state.games.games
                    break;
                case 'games':
                    this.gamesList = this.gamesList.filter(game => {
                        return game.fields.filters.game === true
                    })
                    break;
                case 'experiences':
                    this.gamesList = this.$store.state.games.games.filter(game => {
                        return game.fields.filters.experience === true
                    })
                    break;
                case 'solo':
                    this.gamesList = this.$store.state.games.games.filter(game => {
                        return game.fields.filters.onePlayer === true
                    })
                    break;
                case 'multi':
                    this.gamesList = this.$store.state.games.games.filter(game => {
                        return game.fields.filters.multiPlayer === true
                    })
                    break;
                default: this.gamesList = this.$store.state.games.games
            }
        }

        /**
         * Private
         */

    },
};
