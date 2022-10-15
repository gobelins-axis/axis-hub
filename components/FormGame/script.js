// Vendor
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Components
import InputCheckbox from '@/components/InputCheckbox';
import InputCheckboxToggle from '@/components/InputCheckboxToggle';
import InputImage from '@/components/InputImage';
import InputColor from '@/components/InputColor';
import IconTrash from '@/assets/icons/trash.svg?inline';

const INPUT_TIMEOUT_DELAY = 500;

// TODO:
// Check error messages
// Color picker

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
            showSuccess: false,
            isSuccess: false,
            isFormError: false,
            isFirebaseError: false,
            isInProgress: false,
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

        submit() {
            if (this.isEdit) this.updateGame();
            else this.createGame();
        },

        updateGame() {
            const game = {
                id: this.id,
                fields: {
                    name: this.fields.name,
                    year: this.fields.year,
                    credits: this.fields.credits,
                    description: this.fields.shortDescription,
                    longerDescription: this.fields.longDescription,
                    filters: {
                        onePlayer: this.fields.solo,
                        multiPlayer: this.fields.multiplayer,
                        experience: this.fields.experience,
                        game: this.fields.game,
                    },
                    leaderboardActive: this.fields.showLeaderboard,
                    url: this.fields.url,
                    largeImage: {
                        // Set initial image values
                        name: this.game.fields.largeImage.name,
                        url: this.game.fields.largeImage.url,
                    },
                    mediumImage: {
                        // Set initial image values
                        name: this.game.fields.mediumImage.name,
                        url: this.game.fields.mediumImage.url,
                    },
                    colors: {
                        first: this.fields.color1,
                        secondary: this.fields.color2,
                    },
                    creatorName: this.$store.state.user.user.name,
                    creatorID: this.$store.state.user.user.uid,
                    updatedAt: new Date(),
                },
            };

            this.uploadImages(game).then(() => {
                const collectionRef = collection(this.$firebase.firestore, 'games');
                const documentRef = doc(collectionRef, game.id);

                updateDoc(documentRef, {
                    ...game.fields,
                }).then(() => {
                    this.$firebase.fetchGames(this.$store.state.user.user).then(() => {
                        this.isFormError = false;
                        this.isSuccess = true;
                        this.isFirebaseError = false;
                        this.successRedirect();
                    });
                }).catch((error) => {
                    console.log(error);
                    this.isFormError = false;
                    this.isSuccess = false;
                    this.isFirebaseError = true;
                    this.error = this.$utils.localeCopy.create.errors.default;
                    this.showErrors = true;
                });
            }).catch((error) => {
                console.log(error);
                this.isFormError = false;
                this.isSuccess = false;
                this.isFirebaseError = true;
                this.error = this.$utils.localeCopy.create.errors.default;
                this.showErrors = true;
            });
        },

        createGame() {
            const game = {
                id: this.id,
                fields: {
                    name: this.fields.name,
                    year: this.fields.year,
                    credits: this.fields.credits,
                    description: this.fields.shortDescription,
                    longerDescription: this.fields.longDescription,
                    filters: {
                        onePlayer: this.fields.solo,
                        multiPlayer: this.fields.multiplayer,
                        experience: this.fields.experience,
                        game: this.fields.game,
                    },
                    leaderboardActive: this.fields.showLeaderboard,
                    url: this.fields.url,
                    largeImage: {},
                    mediumImage: {},
                    colors: {
                        first: this.fields.color1,
                        secondary: this.fields.color2,
                    },
                    creatorName: this.$store.state.user.user.name,
                    creatorID: this.$store.state.user.user.uid,
                    createdAt: new Date(),
                    updatedAt: null,
                },
            };

            this.uploadImages(game).then(() => {
                const collectionRef = collection(this.$firebase.firestore, 'games');
                const documentRef = doc(collectionRef, game.id);

                setDoc(documentRef, {
                    ...game.fields,
                    id: game.id,
                }).then(() => {
                    this.$firebase.fetchGames(this.$store.state.user.user).then(() => {
                        this.isFormError = false;
                        this.isSuccess = true;
                        this.isFirebaseError = false;
                        this.successRedirect();
                    });
                }).catch((error) => {
                    console.log(error);
                    this.isFormError = false;
                    this.isSuccess = false;
                    this.isFirebaseError = true;
                    this.error = this.$utils.localeCopy.create.errors.default;
                    this.showErrors = true;
                });
            }).catch((error) => {
                console.log(error);
                this.isFormError = false;
                this.isSuccess = false;
                this.isFirebaseError = true;
                this.error = this.$utils.localeCopy.create.errors.default;
                this.showErrors = true;
            });
        },

        uploadImages(game) {
            const mediumImageName = `medium-image-${this.id}`;
            const largeImageName = `large-image-${this.id}`;

            const storageMediumRef = ref(this.$firebase.storage, mediumImageName);
            const storageLargeRef = ref(this.$firebase.storage, largeImageName);

            game.fields.mediumImage.name = mediumImageName;
            game.fields.largeImage.name = largeImageName;

            return new Promise((resolve, reject) => {
                const uploadPromises = [];
                if (this.game) {
                    if (this.fields.image1 !== this.game.fields.mediumImage.url) uploadPromises.push(this.uploadImage(game.fields.mediumImage, storageMediumRef, this.fields.image1));
                    if (this.fields.image2 !== this.game.fields.largeImage.url) uploadPromises.push(this.uploadImage(game.fields.largeImage, storageLargeRef, this.fields.image2));
                } else {
                    if (this.fields.image1) uploadPromises.push(this.uploadImage(game.fields.mediumImage, storageMediumRef, this.fields.image1));
                    if (this.fields.image2) uploadPromises.push(this.uploadImage(game.fields.largeImage, storageLargeRef, this.fields.image2));
                }

                if (uploadPromises.length === 0) {
                    resolve(game);
                } else {
                    Promise.all(uploadPromises).then(() => {
                        resolve(game);
                    }).catch((error) => {
                        reject(error);
                    });
                }
            });
        },

        uploadImage(image, ref, url) {
            const promise = new Promise((resolve, reject) => {
                uploadBytes(ref, url).then(() => {
                    getDownloadURL(ref).then((response) => {
                        image.url = response;
                        console.log(response);
                        resolve(image);
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            });

            return promise;
        },

        delete() {
            const documentRef = doc(this.$firebase.firestore, 'games', this.id);

            deleteDoc(documentRef).then(() => {
                this.$firebase.fetchGames(this.$store.state.user.user).then(() => {
                    this.deleteRedirect();
                });
            });
        },

        successRedirect() {
            setTimeout(() => {
                this.$router.push(this.localePath(`/games/${this.id}`));
            }, 1000);
        },

        deleteRedirect() {
            this.$router.push(this.localePath('/hub'));
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
            this.fields[e.name] = e.file;
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
            this.$root.overlayDelete.open();

            const confirmHandler = () => {
                this.$root.overlayDelete.$off('confirm', confirmHandler);
                this.$root.overlayDelete.close();
                this.delete();
            };

            const cancelHandler = () => {
                this.$root.overlayDelete.$off('cancel', cancelHandler);
                this.$root.overlayDelete.close();
            };

            this.$root.overlayDelete.$on('confirm', confirmHandler);
            this.$root.overlayDelete.$on('cancel', cancelHandler);
        },

        submitHandler() {
            if (this.isInProgress) return;
            if (this.isSuccess) return;

            this.isInProgress = true;

            this.validateForm()
                .then(() => {
                    this.showErrors = false;
                    this.isFormError = false;
                    this.isInProgress = true;
                    this.isSuccess = false;
                    this.isFirebaseError = false;
                    this.submit();
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
