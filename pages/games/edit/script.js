import {mapGetters} from "vuex";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection, doc, updateDoc, deleteDoc} from "firebase/firestore";

export default {
    computed: {
        ...mapGetters({
            games: 'data/games',
        }),

        getSelectGameDatas() {
            return this.games.find(r => r.id === this.$route.params.id)
        },

        getSelectGameID() {
            return this.games.find(r => r.id === this.$route.params.id).id
        }

    },

    methods: {
        submitHandler(e) {
            e.preventDefault();

            console.log('yo', this.$refs.onePlayer)

            const fields = {
                name: this.$refs.newNameU.value,
                description: this.$refs.inputDescription.value,
                players: this.$refs.players.value,
                url: this.$refs.inputUrl.value,
                credits: this.$refs.credits.value,
                largeImage: {
                    name: 'largeImage', url: null,
                },
                mediumImage: {
                    name: 'mediumImage', url: null,
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
            };

            const mediumImage = this.$refs.mediumImage.files[0];
            const largeImage = this.$refs.largeImage.files[0];
            const storageMediumRef = ref(this.$firebase.storage, 'mediumImage');
            const storageLargeRef = ref(this.$firebase.storage, 'largeImage');

            uploadBytes(storageMediumRef, mediumImage).then(() => {
                console.log('1')
                getDownloadURL(storageMediumRef).then((url) => {
                    console.log('2')
                    fields.mediumImage.url = url;
                }).then(() => {
                    console.log('3')
                    uploadBytes(storageLargeRef, largeImage).then(() => {
                        console.log('4')
                        getDownloadURL(storageLargeRef).then((url) => {
                            console.log('5')
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
            deleteDoc(doc(this.$firebase.firestore, 'games', this.getSelectGameID))
        }
    }

}
