// Components
import InputCheckbox from '@/components/InputCheckbox';
import InputCheckboxToggle from '@/components/InputCheckboxToggle';
import InputImage from '@/components/InputImage';
import InputColor from '@/components/InputColor';

export default {
    data() {
        return {
            fields: {
                name: '',
                year: '',
                credits: '',
                shortDescription: '',
                longDescription: '',
                solo: false,
                multiplayer: false,
                experience: false,
                game: false,
                showLeaderboard: true,
                url: '',
                image1: '',
                image2: '',
                color1: '',
                color2: '',
            },
        };
    },

    methods: {
        /**
         * Private
         */
        inputHandler(e) {
            const input = e.currentTarget;
            this.fields[input.name] = input.value;
        },

        inputCheckboxHandler(e) {
            const input = e.currentTarget;
            this.fields[input.name] = input.checked;
        },

        inputImageHandler(e) {

        },

        inputColorHandler(e) {
            const input = e.currentTarget;
            this.fields[input.name] = input.checked;
        },

        clickCopyIDHandler() {

        },
    },

    components: {
        InputCheckbox,
        InputCheckboxToggle,
        InputImage,
        InputColor,
    },
};
