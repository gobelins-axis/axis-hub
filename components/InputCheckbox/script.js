export default {
    props: ['name', 'label', 'initialValue'],

    data() {
        return {
            value: this.initialValue,
        };
    },

    methods: {
        /**
         * Private
         */
        inputHandler(e) {
            this.value = e.currentTarget.checked;
            this.$emit('input', e);
        },
    },
};
