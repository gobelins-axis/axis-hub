// Components
import InputCheckbox from '@/components/InputCheckbox';
import InputCheckboxToggle from '@/components/InputCheckboxToggle';
import InputImage from '@/components/InputImage';
import InputColor from '@/components/InputColor';
import IconTrash from '@/assets/icons/trash.svg?inline';

export default {
    props: ['game'],

    data() {
        return {
            isEdit: !!this.game,
            id: this.game ? this.game.id : null,
            fields: {
                name: this.game ? this.game.fields.name : '',
                year: this.game ? this.game.fields.year : '',
                credits: this.game ? this.game.fields.credits : '',
                shortDescription: this.game ? this.game.fields.description : '',
                longDescription: this.game ? this.game.fields.longerDescription : '',
                solo: this.game ? this.game.fields.filters.onePlayer : false,
                multiplayer: this.game ? this.game.fields.filters.multiPlayer : false,
                experience: this.game ? this.game.fields.filters.experience : false,
                game: this.game ? this.game.fields.filters.game : false,
                showLeaderboard: this.game ? this.game.fields.leaderboardActive : true,
                url: this.game ? this.game.fields.url : '',
                image1: this.game ? this.game.fields.mediumImage.url : null,
                image2: this.game ? this.game.fields.largeImage.url : null,
                color1: this.game ? this.game.fields.colors.first : '#ff0000',
                color2: this.game ? this.game.fields.colors.secondary : '#ff0000',
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
        IconTrash,
    },
};
