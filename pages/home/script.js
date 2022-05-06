// Vendor
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [seo, pageTransitions],

    methods: {
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
            uploadBytes(storageRef, inputFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(storageRef).then((url) => {
                    fields.image.url = url;

                    addDoc(collection(this.$firebase.firestore, 'games'), {
                        ...fields,
                    });
                });
            });
        },
    },
};
