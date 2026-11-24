export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        activeId: {
            type: String,
            default: null,
        },
    },

    methods: {
        /**
         * Private
         */
        isActive(item) {
            return item.id === this.activeId || item.children.some(child => child.id === this.activeId);
        },
    },
};
