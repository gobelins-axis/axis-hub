import games from './games';
import GameCard from '@/components/GameCard';
import ButtonLink from '@/components/ButtonLink';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            gameList: games,
            onePlayer: '',
            multiplayer: '',
            experience: '',
            game: '',
        };
    },

    components: {
        GameCard,
        ButtonLink
    },

    computed: {
        ...mapGetters({
            games: 'user/games',
        }),
    },
};
