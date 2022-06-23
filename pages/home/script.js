// Vendor
import {doc, collection, setDoc, addDoc, deleteDoc, updateDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [seo, pageTransitions],

    layout: 'home',

    async mounted() {
        // Create a new leaderboard for game: "Test"
        // setDoc(doc(this.$firebase.firestore, 'leaderboards', 'test'), {
        //     name: 'Test',
        // });

        // Create a new leaderboard for game with a auto generated id
        // const leaderboard = await addDoc(collection(this.$firebase.firestore, 'leaderboards'), {
        //     name: 'Test',
        // });
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
        submitHandler(e) {
            e.preventDefault();

            const fields = {
                name: this.$refs.inputName.value,
                description: this.$refs.inputDescription.value,
                url: this.$refs.inputUrl.value,
                image: {
                    name: 'test-image',
                    url: null,
                },
            };

            const inputFile = this.$refs.inputImage.files[0];
            const storageRef = ref(this.$firebase.storage, 'test-image');

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, inputFile).then(() => {
                getDownloadURL(storageRef).then((url) => {
                    fields.image.url = url;
                    addDoc(collection(this.$firebase.firestore, 'games'), {
                        ...fields,
                    });
                });
            });
        },

        deleteHandler(e) {
            e.preventDefault();

            const idToDelete = this.$refs.inputNameD.value

             deleteDoc(doc(this.$firebase.firestore, 'games', idToDelete ), {});
        },

        updateHandler(e) {
            e.preventDefault();

            const idToUpdate = this.$refs.inputNameU.value
            const newGame = this.$refs.newNameU.value

            this.$firebase.firestore.collection("games").doc(idToUpdate).update({description: newGame})
        },
    },
};
