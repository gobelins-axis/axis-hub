// Components
import ButtonGoogleLogin from '@/components/ButtonGoogleLogin';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            showErrors: false,
            isSuccess: false,
            isFormError: false,
            isFirebaseError: false,
            inProgress: false,
        };
    },

    methods: {
        /**
         * Private
         */
        validateForm() {
            this.showErrors = true;

            const promise = new Promise((resolve, reject) => {
                // Test validity (input.validity)
                if (!this.$refs.inputEmail.validity.valid) reject(Error(this.$utils.localeCopy.login.formError));
                if (!this.$refs.inputPassword.validity.valid) reject(Error(this.$utils.localeCopy.login.formError));
                resolve();
            });

            return promise;
        },

        login() {
            this.$firebase.signInUser(this.$firebase.auth, this.email, this.password)
                .then(this.loginSuccededHandler)
                .catch(this.loginFailedHandler);
        },

        /**
         * Handlers
         */
        googleSignInClickHandler() {
            this.$firebase.signInWithGoogle(this.$firebase.auth, this.$firebase.googleAuthProvider);
        },

        emailInputHandler(e) {
            this.showErrors = false;

            this.email = e.currentTarget.value;
        },

        passwordInputHandler(e) {
            this.showErrors = false;

            this.password = e.currentTarget.value;
        },

        submitHandler() {
            if (this.isInProgress) return;
            if (this.isSuccess) return;

            this.validateForm()
                .then(() => {
                    this.isFormError = false;
                    this.isInProgress = true;
                    this.isSuccess = false;
                    this.isFirebaseError = false;
                    this.login();
                })
                .catch(() => {
                    this.isSuccess = false;
                    this.isFormError = true;
                    this.isInProgress = false;
                    this.isFirebaseError = false;
                    this.error = this.$utils.localeCopy.login.errors.form;
                });
        },

        loginFailedHandler(error) {
            this.isFirebaseError = true;

            switch (error.code) {
                case 'auth/user-not-found':
                    this.error = this.$utils.localeCopy.login.errors.userNotFound;
                    break;
                case 'auth/invalid-email':
                    this.error = this.$utils.localeCopy.login.errors.invalidEmail;
                    break;
                case 'auth/wrong-password':
                    this.error = this.$utils.localeCopy.login.errors.wrongPassword;
                    break;
                default:
                    this.error = this.$utils.localeCopy.login.errors.default;
                    break;
            }
        },

        loginSuccededHandler() {
            this.$router.push(this.localePath('/hub'));
        },
    },

    components: {
        ButtonGoogleLogin,
    },
};
