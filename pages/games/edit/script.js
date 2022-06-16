import {mapGetters} from "vuex";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import Verte from "verte";
import 'verte/dist/verte.css';
import {v4 as uuidv4} from 'uuid';

import ButtonSimple from "@/components/ButtonSimple";

export default {
    components: {
        Verte,
        ButtonSimple
    },

    data() {
        return {
            color1: '',
            color2: '',
            mediumImageUpdated: false,
            largeImageUpdated: false,
            success: false,
            error: false,
            initialFields: {}
        }

    },



    mounted() {
        console.log('color', this.getSelectGameDatas.fields.colors.first)

        this.color1 = this.getSelectGameDatas.fields.colors.first
        this.color2 = this.getSelectGameDatas.fields.colors.secondary


        this.initialFields = {
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
            largeImage: {
                url: this.$refs.largeImage.url
            },
            mediumImage: {
                url: this.$refs.mediumImage.url
            },
            colors: {
                first: this.$refs.color1.value,
                secondary: this.$refs.color2.value,
            },
            createdAt: new Date(),
            updatedAt: null,
        };

        console.log(this.initialFields)

    },

    computed: {
        ...mapGetters({
            games: 'user/games',
        }),

        getSelectGameDatas() {
            console.log(this.games.find(r => r.id === this.$route.params.id))
            return this.games.find(r => r.id === this.$route.params.id)
        },

        getSelectGameID() {
            return this.games.find(r => r.id === this.$route.params.id).id
        }

    },

    methods: {
        copyToClipboard() {
            this.$refs.tokenID.focus()
            document.execCommand('copy')
        },

        createFileReader() {
            const reader = new FileReader();
            return reader;
        },

        addedMediumImage() {
            console.log('medium image updated');
            this.mediumImageUpdated = true;


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
            console.log('large image updated');
            this.largeImageUpdated = true;

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
            e.preventDefault();

            // ERROR HANDLING
            document.querySelectorAll('.errorOnForm').forEach(item => item.classList.remove('errorOnForm'))

            this.error = false
            this.success = false

            const mediumImage = this.$refs.mediumImage.files[0];
            const largeImage = this.$refs.largeImage.files[0];

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
            if (this.$refs.previewMediumImage.src === undefined) {
                errors.push('medium')
            }
            if (this.$refs.previewLargeImage.src === undefined) {
                errors.push('large')
            }

            if (errors.length > 0) {
                console.log('errors are', errors)
                this.error = true;
                errors.forEach(error => {
                    this.$refs[error].classList.add('errorOnForm')
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

            const storageMediumRef = ref(this.$firebase.storage, `medium-image-${this.getSelectGameID}`);
            const storageLargeRef = ref(this.$firebase.storage, `large-image-${this.getSelectGameID}`);

            const promises = []

            if (this.mediumImageUpdated && this.largeImageUpdated) {
                promises.push(uploadBytes(storageMediumRef, mediumImage))
                promises.push(uploadBytes(storageLargeRef, largeImage))
            } else if (this.mediumImageUpdated) {
                promises.push(uploadBytes(storageMediumRef, mediumImage))
            } else if (this.largeImageUpdated) {
                promises.push(uploadBytes(storageLargeRef, largeImage))
            }

            const gameUID = this.getSelectGameDatas.fields.id

            Promise.all(promises).then(() => {
                Promise.all([
                    // Get URLs
                    getDownloadURL(storageMediumRef),
                    getDownloadURL(storageLargeRef),
                ]).then(([urlMedium, urlLarge]) => {
                    fields.mediumImage.name = `medium-image-${gameUID}`;
                    fields.mediumImage.url = urlMedium;

                    fields.largeImage.name = `large-image-${gameUID}`;
                    fields.largeImage.url = urlLarge;
                    updateDoc(doc(collection(this.$firebase.firestore, 'games'), this.getSelectGameID), {
                        ...fields,
                    }).then(() => {
                        this.success = true
                        this.$firebase.fetchGames(this.$store.state.user.user)
                        // this.$router.push('/hub')
                    }, () => {
                        this.error = true;
                    })
                });
            });
        },


        openPopin(popin) {
            if (popin === 'delete') {
                this.$refs.deleteOverlay.classList.add('open')
                document.querySelector('body').style.overflowY = 'hidden';
            } else if (popin === 'cancel') {
                this.$refs.cancelOverlay.classList.add('open')
                document.querySelector('body').style.overflowY = 'hidden';
            }

        }
        ,

        closePopin(popin) {
            if (popin === 'delete') {
                this.$refs.deleteOverlay.classList.remove('open')
                document.querySelector('body').style.overflowY = 'initial';
            } else if (popin === 'cancel') {
                this.$refs.cancelOverlay.classList.remove('open')
                document.querySelector('body').style.overflowY = 'initial';
            }
        }
        ,

        deleteHandler(e) {
            this.$refs.cancelOverlay.classList.remove('open')
            document.querySelector('body').style.overflowY = 'initial';
            deleteDoc(doc(this.$firebase.firestore, 'games', this.getSelectGameID)).then(() => {
                    this.$store.dispatch('games/deleteGame', this.getSelectGameID).then(() => {
                        this.$store.dispatch('user/removeGame', this.getSelectGameID).then(() => {
                            this.$router.push('/hub')
                        })
                    })
                }
            )
        }
        ,

        cancelHandler(e) {
            console.log('cancerl')

            this.$refs.name.value = this.initialFields.name
            this.$refs.year.value = this.initialFields.year
            this.$refs.players.value = this.initialFields.players
            this.$refs.credits.value = this.initialFields.credits
            this.$refs.inputDescription.value = this.initialFields.description
            this.$refs.inputDescriptionLong.value = this.initialFields.longerDescription
            this.$refs.onePlayer.checked = this.initialFields.filters.onePlayer
            this.$refs.multiPlayer.checked = this.initialFields.filters.multiPlayer
            this.$refs.experience.checked = this.initialFields.filters.experience
            this.$refs.game.checked = this.initialFields.filters.game
            this.$refs.leaderboard.checked = this.initialFields.leaderboardActive
            this.$refs.url.value = this.initialFields.url
            this.$refs.previewMediumImage.src = this.initialFields.mediumImage.url
            this.$refs.previewLargeImage.src = this.initialFields.largeImage.url

            // players: this.$refs.players.value,
            //     url: this.$refs.inputUrl.value,
            //     credits: this.$refs.credits.value,
            //     largeImage: {
            //     name: `large-image-${this.getSelectGameID}`, url: null,
            // },
            // mediumImage: {
            //     name: `medium-image-${this.getSelectGameID}`, url: null,
            // },
            // leaderboardActive: this.$refs.leaderboard.checked,
            //     filters: {
            //     onePlayer: this.$refs.onePlayer.checked,
            //         multiPlayer: this.$refs.multiPlayer.checked,
            //         experience: this.$refs.experience.checked,
            //         game: this.$refs.game.checked,
            // },
            // colors: {
            //     first: this.$refs.color1.value, secondary: this.$refs.color2.value,
            // },
            // updatedAt: new Date(),
        }
    },

}
