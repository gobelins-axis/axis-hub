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
                if (!this.validateBasicInput(this.$refs.inputName).isValid) reject(Error(this.validateBasicInput(this.$refs.inputName).error));
                if (!this.validateYearInput().isValid) reject(Error(this.validateYearInput().error));
                if (!this.validateBasicInput(this.$refs.inputCredits).isValid) reject(Error(this.validateBasicInput(this.$refs.inputCredits).error));
                if (!this.validateBasicInput(this.$refs.inputShortDescription).isValid) reject(Error(this.validateBasicInput(this.$refs.inputShortDescription).error));
                if (!this.validateBasicInput(this.$refs.inputLongDescription).isValid) reject(Error(this.validateBasicInput(this.$refs.inputLongDescription).error));
                if (!this.validateURLInput().isValid) reject(Error(this.validateURLInput().error));
                if (!this.validateImageInput('image1').isValid) reject(Error(this.validateImageInput('image1').error));
                if (!this.validateImageInput('image2').isValid) reject(Error(this.validateImageInput('image2').error));
                if (!this.validateColorInput('color1').isValid) reject(Error(this.validateColorInput('color1').error));
                if (!this.validateColorInput('color2').isValid) reject(Error(this.validateColorInput('color2').error));
                resolve();
            });

            return promise;
        },

        /**
         * Validations
         */
        validateBasicInput(input) {
            const isValid = input.validity.valid;
            let error = null;

            if (!isValid) {
                error = this.$utils.localeCopy.create.errors.form;
            }

            return { isValid, error };
        },

        validateYearInput() {
            const isValidInput = this.$refs.inputYear.validity.valid;

            if (!isValidInput) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            const yearRegex = /^[2][0][0-9]{2}$/;
            const isValidYear = yearRegex.test(this.fields.year);

            if (!isValidYear) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            return { isValid: true, error: null };
        },

        validateURLInput() {
            const isValidInput = this.$refs.inputUrl.validity.valid;

            if (!isValidInput) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            // eslint-disable-next-line no-useless-escape
            const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
            const isValidYear = urlRegex.test(this.fields.url);

            if (!isValidYear) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            return { isValid: true, error: null };
        },

        validateImageInput(name) {
            return this.$refs[name].validate();
        },

        validateColorInput(name) {
            const colorRegex = /^#([0-9a-f]{3}){1,2}$/i;
            const isValidColor = colorRegex.test(this.fields[name]);

            if (!isValidColor) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            return { isValid: true, error: null };
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
            this.fields[e.name] = e.blob;
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
                    this.showErrors = false;
                    this.isFormError = false;
                    this.isInProgress = true;
                    this.isSuccess = false;
                    this.isFirebaseError = false;
                    console.log('Success');
                    // this.login();
                })
                .catch((error) => {
                    this.isSuccess = false;
                    this.isFormError = true;
                    this.isInProgress = false;
                    this.isFirebaseError = false;
                    this.error = error.message;
                    console.log('Error');
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
