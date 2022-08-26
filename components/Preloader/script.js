// Vendor
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            isLoadingCompleted: 'preloader/isLoadingCompleted',
        }),
    },

    watch: {
        isLoadingCompleted(isComplete) {
            if (isComplete) this.$el.style.display = 'none';
        },
    },

    mounted() {
        this.loadResources();
    },

    methods: {
        loadResources() {
            this.$store.dispatch('preloader/setLoadingCompleted');
            this.$store.dispatch('preloader/setCompleted');
        },
    },
};
