// Vendor
import { mapGetters } from 'vuex';

// Components
import ButtonHome from '@/components/ButtonHome';

export default {
    data() {
        return {
            theme: '',
        };
    },

    computed: {
        ...mapGetters({
            isLoggedIn: 'user/isLoggedIn',
        }),
    },

    watch: {
        $route(to, from) {
            this.updateTheme(to);
        },
    },

    mounted() {
        this.updateTheme(this.$route);
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
    },

    components: {
        ButtonHome,
    },
};
