// Components
import IconSolo from '@/assets/icons/solo.svg?inline';
import IconMulti from '@/assets/icons/multi.svg?inline';
import IconGame from '@/assets/icons/game.svg?inline';
import IconExperience from '@/assets/icons/experience.svg?inline';

export default {
    props: ['tag'],

    computed: {
        content() {
            if (this.tag.type === 'solo') return 'Solo';
            if (this.tag.type === 'multi') return 'Multi';
            if (this.tag.type === 'game') return 'Jeu';
            if (this.tag.type === 'experience') return 'Experience';
        },

        icon() {
            if (this.tag.type === 'solo') return 'IconSolo';
            if (this.tag.type === 'multi') return 'IconMulti';
            if (this.tag.type === 'game') return 'IconGame';
            if (this.tag.type === 'experience') return 'IconExperience';
        },
    },

    components: {
        IconSolo,
        IconMulti,
        IconGame,
        IconExperience,
    },
};
