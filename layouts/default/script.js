// Components
import ThePreloader from '@/components/ThePreloader';
import TheNavigation from '@/components/TheNavigation';
import TheOverlayDelete from '@/components/TheOverlayDelete';

export default {
    watch: {
        $route(to, from) {
            // Store routing history for page transitions
            this.$store.dispatch('router/setCurrent', to);
            this.$store.dispatch('router/setPrevious', from);
        },
    },

    mounted() {
        this.$store.dispatch('router/setCurrent', this.$route);
    },

    components: {
        ThePreloader,
        TheNavigation,
        TheOverlayDelete,
    },
};

/**
 * Clears console on reload
 */
if (module.hot) {
    module.hot.accept();
    module.hot.addStatusHandler((status) => {
        if (status === 'prepare') console.clear();
    });
}
