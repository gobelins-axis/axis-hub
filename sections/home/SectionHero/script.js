// Components
import ArrowBack from '@/assets/icons/arrow-back.svg?inline';

export default {
    methods: {
        /**
         * Handlers
         */
        clickScrollHandler() {
            // Scroll to the section right below the hero
            window.scrollTo({ top: this.$el.offsetHeight, behavior: 'smooth' });
        },
    },

    components: {
        ArrowBack,
    },
};
