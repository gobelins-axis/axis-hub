// Vendor
import * as firebase from 'firebase/auth';
import {mapGetters} from 'vuex';
import ButtonSubmit from '@/components/ButtonSubmit';


// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';
import {collection, doc, setDoc} from "firebase/firestore";

export default {
    mixins: [seo, pageTransitions],

    components: {ButtonSubmit},

    data() {
        return {
            signupPage: false, error: false, errorMessage: ' '
        }
    },

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

        ui.start(this.$refs.firebaseLoginContainer, {
            signInOptions: [{
                provider: firebase.GoogleAuthProvider.PROVIDER_ID, requireDisplayName: true,
            },], callbacks: {
                signInSuccessWithAuthResult: (authResult) => {
                    const userStructure = {
                        name: authResult.user.displayName, email: authResult.user.email, userID: authResult.user.uid,
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
        },);
    },

    methods: {
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },

        toggleLoginMode() {
            this.errorMessage = ' '
            this.signupPage = !this.signupPage
        },

        resetPassword() {
            // if (this.$refs.email.value) {
                this.$firebase.resetPassword(this.$firebase.auth, this.$refs.email.value)
                    .then(() => this.$refs.resetPassword.innerHTML = 'Un mail à été envoyé. Il se trouve peut-être dans vos spams.')
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/missing-mail':
                                this.errorMessage = 'Renseignez votre email pour pouvoir réinitialiser votre mot de passe.'
                                break
                            case 'auth/invalid-email':
                                this.errorMessage = 'Votre adresse email est invalide.'
                                break
                            case 'auth/wrong-password':
                                this.errorMessage = 'Le mot de passe ne correspond pas à cette adresse mail.'
                                break
                            default:
                                this.errorMessage = 'Nous avons rencontré une erreur inconnue. Contactez gobelins.axis.development@gmail.com'
                        }
                })

            // } else this.errorMessage = 'Renseignez votre mail pour réinitialiser votre mot de passe'

        },

        submitLoginForm(e) {
            e.preventDefault()

            this.errorMessage = ' '

            const email = this.$refs.email.value
            const password = this.$refs.password.value

            // ERROR HANDLING
            document.querySelectorAll('.errorOnForm').forEach(item => item.classList.remove('error'))

            let errors = [];

            if (this.$refs.password.value.length === 0) {
                errors.push('password')
                this.errorMessage = 'Renseignez un mot de passe.'
            }
            if (this.signupPage) {
                if (this.$refs.password.value !== this.$refs.passwordConfirm.value) {
                    errors.push('passwordConfirm')
                    this.errorMessage = 'Les mots de passe ne correspondent pas.'
                }
            }

            if (errors.length > 0) {
                console.log('errors are', errors)
                this.error = true;
                errors.forEach(error => {
                    this.$refs[error].classList.add('errorOnForm')
                })
                return;
            }


            if (this.signupPage) {
                this.$firebase.createUser(this.$firebase.auth, email, password)
                    .then(() => this.$router.push('/hub'))
                    .catch((error) => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                this.errorMessage = 'Un compte existe déja à cette adresse email.'
                                break
                            case 'auth/invalid-email':
                                this.errorMessage = 'Votre adresse email est invalide.'
                                break
                            case 'auth/weak-password':
                                this.errorMessage = 'Votre mot de passe doit contenir au moins 6 caractères.'
                                break
                            default:
                                this.errorMessage = 'Nous avons rencontré une erreur inconnue. Contactez gobelins.axis.development@gmail.com'
                        }
                    })
            } else {
                this.$firebase.signInUser(this.$firebase.auth, email, password)
                    .then(() => this.$router.push('/hub'))
                    .catch((error) => {
                        console.log(error.code)
                        switch (error.code) {
                            case 'auth/user-not-found':
                                this.errorMessage = 'Aucun compte ne correspond à cette adresse email'
                                break
                            case 'auth/invalid-email':
                                this.errorMessage = 'Votre adresse email est invalide.'
                                break
                            case 'auth/wrong-password':
                                this.errorMessage = 'Le mot de passe ne correspond pas à cette adresse mail'
                                break
                            default:
                                this.errorMessage = 'Nous avons rencontré une erreur inconnue. Contactez gobelins.axis.development@gmail.com'
                        }
                    })
            }
        }
    },
};
