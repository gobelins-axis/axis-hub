// Vendor
import { mapGetters } from 'vuex';

// Utils
import modulo from '@/utils/number/modulo';

// Components
import ArrowBack from '@/assets/icons/arrow-back.svg?inline';

export default {
    props: ['game'],

    computed: {
        ...mapGetters({
            games: 'games/games',
        }),

        previous() {
            const currentIndex = this.games.indexOf(this.game);
            const previousIndex = modulo(currentIndex - 1, this.games.length);
            const previousGame = this.games[previousIndex];
            return previousGame;
        },

        next() {
            const currentIndex = this.games.indexOf(this.game);
            const nextIndex = modulo(currentIndex + 1, this.games.length);
            const nextGame = this.games[nextIndex];
            return nextGame;
        },
    },

    components: {
        ArrowBack,
    },
};
