// Components
import CardUserGame from '@/components/CardUserGame';
import CardCreateGame from '@/components/CardCreateGame';
import CardGameEmpty from '@/components/CardGameEmpty';

export default {
    props: ['games'],

    computed: {
        cards() {
            const lengthMin = 6;
            const cards = [{ isCardCreateGame: true }, ...this.games];
            const emptyCard = { isCardEmpty: true };

            while (cards.length < lengthMin) {
                cards.push(emptyCard);
            }

            return cards;
        },
    },

    components: {
        CardUserGame,
        CardCreateGame,
        CardGameEmpty,
    },
};
