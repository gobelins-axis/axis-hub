// Vendor
import { mapGetters } from 'vuex';

// Components
import ButtonHome from '@/components/ButtonHome';

const SCROLL_THRESHOLD = 10;

export default {
    data() {
        return {
            theme: '',
            isScrolled: false,
        };
    },

    computed: {
        ...mapGetters({
            isLoggedIn: 'user/isLoggedIn',
        }),

        currentTheme() {
            // The white background of the scrolled state needs dark content
            return this.isScrolled ? 'black' : this.theme;
        },
    },

    watch: {
        $route(to, from) {
            this.updateTheme(to);
            this.updateScrolled();
        },
    },

    mounted() {
        this.updateTheme(this.$route);
        this.updateScrolled();
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
    },

    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandler);
        cancelAnimationFrame(this.scrollRequest);
    },

    methods: {
        /**
         * Private
         */
        updateTheme(route) {
            const routesWithThemeWhite = ['games-id', 'index'];
            const routeName = this.getRouteBaseName(route);

            if (routesWithThemeWhite.includes(routeName)) this.theme = 'white';
            else this.theme = 'black';
        },

        updateScrolled() {
            this.isScrolled = window.scrollY > SCROLL_THRESHOLD;
        },

        scrollHandler() {
            cancelAnimationFrame(this.scrollRequest);
            this.scrollRequest = requestAnimationFrame(this.updateScrolled);
        },
    },

    components: {
        ButtonHome,
    },
};
