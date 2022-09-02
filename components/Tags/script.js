// Components
import Tag from '@/components/Tag';

export default {
    props: ['filters'],

    computed: {
        tags() {
            const tags = [];

            if (this.filters.onePlayer) tags.push({ type: 'solo' });
            if (this.filters.multiPlayer) tags.push({ type: 'multi' });
            if (this.filters.game) tags.push({ type: 'game' });
            if (this.filters.experience) tags.push({ type: 'experience' });

            return tags;
        },
    },

    components: {
        Tag,
    },
};
