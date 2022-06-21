import GameCard from '@/components/GameCard';
import ButtonLink from '@/components/ButtonLink';
import Filters from '@/components/Filters';

export default {
    data() {
        return {
            onePlayer: '',
            multiplayer: '',
            experience: '',
            gamesList: this.$store.state.user.games,
        };
    },

    components: {
        GameCard,
        ButtonLink,
        Filters
    },

    computed: {
        getNumberOfEmpty() {
            if (this.gamesList.length === 0) return 8
            else {
                switch (this.gamesList.length % 3) {
                    case 0:
                        return 5;
                        break
                    case 1:
                        return 7;
                        break;
                    case 2:
                        return 6;
                        break;
                }
            }
        }
    },

    methods: {
        setFilter(str) {
            switch (str) {
                case 'all':
                    this.gamesList = this.$store.state.user.games
                    break;
                case 'games':
                    this.gamesList = this.gamesList.filter(game => {
                        return game.fields.filters.game === true
                    })
                    break;
                case 'experiences':
                    this.gamesList = this.gamesList.filter(game => {
                        return game.fields.filters.experience === true
                    })
                    break;
                case 'solo':
                    this.gamesList = this.gamesList.filter(game => {
                        return game.fields.filters.onePlayer === true
                    })
                    break;
                case 'multi':
                    this.gamesList = this.gamesList.filter(game => {
                        return game.fields.filters.multiPlayer === true
                    })
                    break;
                default: this.gamesList = this.$store.state.user.games
            }
        }
    }
};
