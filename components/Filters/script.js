export default {

    props: {
        background: Boolean,
    },

    data() {
        return {
            activeFilter: 'all',
            filters: ['all', 'games', 'experiences', 'solo', 'multi'],
        }
    },

    methods: {
        clickFilterHandler(index) {
            this.activeFilter = this.filters[index]
            this.$emit('filter', this.activeFilter)
        }
    }
};
