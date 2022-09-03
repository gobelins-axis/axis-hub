export default {
    props: ['name', 'initialValue'],

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
            this.value = e.currentTarget.value;
            this.$emit('input', e);
        },
    },
};
