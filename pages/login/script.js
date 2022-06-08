// Vendor
import * as firebase from 'firebase/auth';
import {mapGetters} from 'vuex';

// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';
import {collection, doc, setDoc} from "firebase/firestore";

export default {
    mixins: [seo, pageTransitions],

    computed: {
        ...mapGetters({
            isUserLoggedIn: 'user/isLoggedIn',
        }),

    },

    mounted() {
        if (this.isUserLoggedIn) return;

        let ui;
        if (firebaseui.auth.AuthUI.getInstance()) {
            ui = firebaseui.auth.AuthUI.getInstance()
        } else {
            ui = new this.$firebaseui.auth.AuthUI(this.$firebase.auth);
        }

        ui.start(
            this.$refs.firebaseLoginContainer,
            {
                signInOptions: [
                    {
                        provider: firebase.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: true,
                    },
                    {
                        provider: firebase.GoogleAuthProvider.PROVIDER_ID,
                        requireDisplayName: true,
                    },
                ],
                callbacks: {
                    signInSuccessWithAuthResult: (authResult) => {
                        const userStructure = {
                            name: authResult.user.displayName,
                            email: authResult.user.email,
                            userID: authResult.user.uid,
                        }

                        const userDocName = userStructure.name.replace(/\s/g, '')

                        setDoc(doc(collection(this.$firebase.firestore, 'users'), userDocName), {
                            ...userStructure
                        }).then(() => {
                            this.$router.push('/hub')
                            return false;
                        })

                    },
                },
            },
        );
    },

    methods: {
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },
    },
};
