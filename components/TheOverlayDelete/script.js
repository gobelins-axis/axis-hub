export default {
    created() {
        this.$root.overlayDelete = this;
    },

    mounted() {
        this.isOpen = false;
    },

    methods: {
        open() {
            this.isOpen = true;
            this.$el.style.visibility = 'visible';
        },

        close() {
            this.isOpen = false;
            this.$el.style.visibility = 'hidden';
        },

        clickYesHandler() {
            this.$emit('confirm');
        },

        clickNoHandler() {
            this.$emit('cancel');
        },
    },
};
