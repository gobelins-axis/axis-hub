// Vendor
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

// Components
import InputCheckbox from '@/components/InputCheckbox';
import InputCheckboxToggle from '@/components/InputCheckboxToggle';
import InputImage from '@/components/InputImage';
import InputColor from '@/components/InputColor';
import IconTrash from '@/assets/icons/trash.svg?inline';

const INPUT_TIMEOUT_DELAY = 500;

export default {
    props: ['game'],

    data() {
        return {
            isEdit: !!this.game,
            id: this.game ? this.game.id : null,
            isIDCopied: false,
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
            error: '',
            showErrors: false,
            isSuccess: false,
            isFormError: false,
            isFirebaseError: false,
            inProgress: false,
        };
    },

    methods: {
        /**
         * Private
         */
        generateID() {
            if (this.isEdit) return;

            if (!this.fields.name) {
                this.id = null;
            } else {
                this.id = `${slugify(this.fields.name)}-${uuidv4()}`;
            }
        },

        validateForm() {
            this.showErrors = true;

            const promise = new Promise((resolve, reject) => {
                // Test validity (input.validity)
                // if (!this.$refs.inputEmail.validity.valid) reject(Error(this.$utils.localeCopy.login.formError));
                // if (!this.$refs.inputPassword.validity.valid) reject(Error(this.$utils.localeCopy.login.formError));
                resolve();
            });

            return promise;
        },

        /**
         * Handlers
         */
        inputHandler(e) {
            const input = e.currentTarget;
            this.fields[input.name] = input.value;

            if (input.name === 'name') this._inputNameHandler();
        },

        _inputNameHandler() {
            clearTimeout(this.inputNameDebounceTimeout);
            this.inputNameDebounceTimeout = setTimeout(() => {
                this.generateID();
            }, INPUT_TIMEOUT_DELAY);
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
            clearTimeout(this.copiedStateTimeout);
            navigator.clipboard.writeText(this.id).then(() => {
                this.isIDCopied = true;
                this.copiedStateTimeout = setTimeout(() => {
                    this.isIDCopied = false;
                }, 2000);
            });
        },

        clickDeleteHandler() {

        },

        submitHandler() {
            if (this.isInProgress) return;
            if (this.isSuccess) return;

            this.validateForm()
                .then(() => {
                    this.isFormError = false;
                    this.isInProgress = true;
                    this.isSuccess = false;
                    this.isFirebaseError = false;
                    // this.login();
                })
                .catch(() => {
                    this.isSuccess = false;
                    this.isFormError = true;
                    this.isInProgress = false;
                    this.isFirebaseError = false;
                    this.error = this.$utils.localeCopy.create.errors.form;
                });
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
