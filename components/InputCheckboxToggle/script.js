export default {
    props: ['name', 'option1', 'option2', 'initialValue'],

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
