// Vendor
import {doc, collection, setDoc, addDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import Verte from 'verte';
import 'verte/dist/verte.css';
import {v4 as uuidv4} from 'uuid';
import ButtonSimple from '../../../components/ButtonSimple'

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';
import slugify from "slugify";

export default {
    mixins: [seo, pageTransitions],

    components: {
        Verte,
        ButtonSimple
    },

    data() {
        return {
            color1: '',
            color2: '',
            mediumImageAdded: false,
            largeImageAdded: false,
            success: false,
            error: false
        }

    },


    methods: {
        /**
         * Public
         */
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },

        /**
         * Private
         */
        createFileReader() {
            const reader = new FileReader();
            return reader;
        },

        addedMediumImage() {
            console.log('medium image added');

            const fileReader = this.createFileReader();

            if (this.$refs.mediumImage.files[0]) {
                this.mediumImageAdded = true
                fileReader.readAsDataURL(this.$refs.mediumImage.files[0]);
                fileReader.addEventListener('load', () => {
                    this.$refs.previewMediumImage.alt = this.$refs.mediumImage.files[0].name;
                    this.$refs.previewMediumImage.src = fileReader.result;
                })
            }
        },

        addedLargeImage() {
            console.log('large image added');

            const fileReader = this.createFileReader();

            if (this.$refs.largeImage.files[0]) {
                this.largeImageAdded = true
                fileReader.readAsDataURL(this.$refs.largeImage.files[0]);
                fileReader.addEventListener('load', () => {
                    this.$refs.previewLargeImage.alt = this.$refs.largeImage.files[0].name;
                    this.$refs.previewLargeImage.src = fileReader.result;
                })
            }
        },

        submitHandler(e) {
            // reset
            e.preventDefault();
            document.querySelectorAll('.error').forEach(item => item.classList.remove('error'))

            this.error = false
            this.success = false

            const mediumImage = this.$refs.mediumImage.files[0];
            const largeImage = this.$refs.largeImage.files[0];

            console.log(mediumImage)


            // ERRORS
            let errors = [];
            let yearRegex = /^[2][0-1][0-9]{2}$/

            if (this.$refs.inputName.value === '') {
                errors.push('inputName')
            }
            if (!yearRegex.test(this.$refs.year.value)) {
                errors.push('year')
            }
            if (this.$refs.players.value === '') {
                errors.push('players')
            }
            if (this.$refs.credits.value === '') {
                errors.push('credits')
            }
            if (this.$refs.url.value === '') {
                errors.push('url')
            }
            if (!this.$refs.onePlayer.checked & !this.$refs.multiPlayer.checked & !this.$refs.game.checked & !this.$refs.experience.checked) {
                errors.push('tags')
            }
            if (this.color1 === '#000000' || this.color2 === '#000000') {
                errors.push('colors')
            }
            if (mediumImage === undefined) {
                errors.push('medium')
            }
            if (largeImage === undefined) {
                errors.push('large')
            }

            if (errors.length > 0) {
                this.error = true;
                errors.forEach(error => {
                    this.$refs[error].classList.add('error')
                })
                return;
            }


            const fields = {
                name: this.$refs.inputName.value,
                year: this.$refs.year.value,
                players: this.$refs.players.value,
                credits: this.$refs.credits.value,
                description: this.$refs.inputDescription.value,
                longerDescription: this.$refs.inputDescriptionLong.value,
                filters: {
                    onePlayer: this.$refs.onePlayer.checked,
                    multiPlayer: this.$refs.multiPlayer.checked,
                    experience: this.$refs.experience.checked,
                    game: this.$refs.game.checked,
                },
                leaderboardActive: this.$refs.leaderboard.checked,
                url: this.$refs.url.value,
                largeImage: {},
                mediumImage: {},
                colors: {
                    first: this.color1,
                    secondary: this.color2,
                },
                createdAt: new Date(),
                updatedAt: null,
            };

            const gameUID = `${slugify(fields.name)}-${uuidv4()}`;

            const storageMediumRef = ref(this.$firebase.storage, `medium-image-${gameUID}`);
            const storageLargeRef = ref(this.$firebase.storage, `large-image-${gameUID}`);

            Promise.all([
                // Upload images
                uploadBytes(storageMediumRef, mediumImage),
                uploadBytes(storageLargeRef, largeImage),
            ]).then(() => {
                Promise.all([
                    // Get URLs
                    getDownloadURL(storageMediumRef),
                    getDownloadURL(storageLargeRef),
                ]).then(([urlMedium, urlLarge]) => {
                    fields.mediumImage.name = `medium-image-${gameUID}`;
                    fields.mediumImage.url = urlMedium;

                    fields.largeImage.name = `large-image-${gameUID}`;
                    fields.largeImage.url = urlLarge;
                    setDoc(doc(collection(this.$firebase.firestore, 'games'), gameUID), {
                        ...fields,
                        id: gameUID,
                        creatorName: this.$store.state.user.user.name,
                        creatorID: this.$store.state.user.user.uid,
                    }).then(() => {
                        this.success = true
                        this.$store.dispatch('games/addGames', fields).then(() => {
                            this.$store.dispatch('user/addGame', fields).then(() => {
                                // this.$router.push('/hub')
                            })
                        }), () => {
                            this.error = true;
                        }
                    });
                });
            });
        },
    },
};
