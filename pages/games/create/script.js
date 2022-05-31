// Vendor
import { doc, collection, setDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';
import slugify from "slugify";

export default {
    mixins: [seo, pageTransitions],

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
                players: this.$refs.players.value,
                url: this.$refs.inputUrl.value,
                credits: this.$refs.credits.value,
                largeImage: {
                    name: 'largeImage', url: null,
                },
                mediumImage: {
                    name: 'mediumImage', url: null,
                },
                leaderboardActive: this.$refs.leaderboard.value,
                filters: {
                    onePlayer: this.$refs.onePlayer.value,
                    multiPlayer: this.$refs.multiPlayer.value,
                    experience: this.$refs.experience.value,
                    game: this.$refs.game.value,
                },
                colors: {
                    first: this.$refs.color1.value,
                    secondary: this.$refs.color2.value,
                },
            };

            const gameUID = `${slugify(fields.name)}-${uuidv4()}`;

            const mediumImage = this.$refs.mediumImage.files[0];
            const largeImage = this.$refs.largeImage.files[0];
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
                    fields.mediumImage.url = urlMedium;
                    fields.largeImage.url = urlLarge;
                    setDoc(doc(collection(this.$firebase.firestore, 'games'), gameUID), {
                        ...fields,
                        uid: gameUID,
                    });             
                });                 
            });
        },
    },
};
