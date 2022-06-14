import {mapGetters} from "vuex";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, doc, updateDoc, deleteDoc} from "firebase/firestore";
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
            mediumImageAdded: true,
            largeImageAdded: true,
            success: false,
            error: false
        }

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
            e.preventDefault();

            const fields = {
                name: this.$refs.newNameU.value,
                description: this.$refs.inputDescription.value,
                players: this.$refs.players.value,
                url: this.$refs.inputUrl.value,
                credits: this.$refs.credits.value,
                largeImage: {
                    name: `large-image-${this.getSelectGameID}`, url: null,
                },
                mediumImage: {
                    name: `medium-image-${this.getSelectGameID}`, url: null,
                },
                leaderboardActive: this.$refs.leaderboard.checked,
                filters: {
                    onePlayer: this.$refs.onePlayer.checked,
                    multiPlayer: this.$refs.multiPlayer.checked,
                    experience: this.$refs.experience.checked,
                    game: this.$refs.game.checked,
                },
                colors: {
                    first: this.$refs.color1.value, secondary: this.$refs.color2.value,
                },
                updatedAt: new Date(),
            };

            const mediumImage = this.$refs.mediumImage.files[0];
            const largeImage = this.$refs.largeImage.files[0];
            const storageMediumRef = ref(this.$firebase.storage, `medium-image-${this.getSelectGameID}`);
            const storageLargeRef = ref(this.$firebase.storage, `large-image-${this.getSelectGameID}`);

            uploadBytes(storageMediumRef, mediumImage).then(() => {
                getDownloadURL(storageMediumRef).then((url) => {
                    fields.mediumImage.url = url;
                }).then(() => {
                    uploadBytes(storageLargeRef, largeImage).then(() => {
                        getDownloadURL(storageLargeRef).then((url) => {
                            fields.largeImage.url = url;
                            updateDoc(doc(this.$firebase.firestore, 'games', this.getSelectGameID), {
                                ...fields,
                            });
                        });
                    });
                });
            });
        },

        deleteHandler(e) {
            deleteDoc(doc(this.$firebase.firestore, 'games', this.getSelectGameID)).then(() => {
                    this.$store.dispatch('games/deleteGame', this.getSelectGameID).then(() => {
                        this.$store.dispatch('user/removeGame', this.getSelectGameID).then(() => {
                            this.$router.push('/hub')
                        })
                    })
                }
            )
        }
    }

}
