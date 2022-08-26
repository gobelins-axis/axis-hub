export default {
    data() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
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
                // Test passwords match
                if (!this.password !== this.passwordConfirmation) reject(Error(this.$utils.localeCopy.login.errors.passwordsNotMatching));
                // Test validity (input.validity)
                if (!this.$refs.inputEmail.validity.valid) reject(Error(this.$utils.localeCopy.login.errors.form));
                if (!this.$refs.inputPassword.validity.valid) reject(Error(this.$utils.localeCopy.login.errors.form));
                if (!this.$refs.inputPasswordConfirmation.validity.valid) reject(Error(this.$utils.localeCopy.login.errors.form));
                resolve();
            });

            return promise;
        },

        register() {
            this.$firebase.createUser(this.$firebase.auth, this.email, this.password)
                .then(() => this.registerSuccededHandler)
                .catch(this.registerFailedHandler);
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

        passwordConfirmationInputHandler(e) {
            this.showErrors = false;

            this.passwordConfirmation = e.currentTarget.value;
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
                    this.register();
                })
                .catch((error) => {
                    this.isSuccess = false;
                    this.isFormError = true;
                    this.isInProgress = false;
                    this.isFirebaseError = false;
                    this.error = error.message;
                });
        },

        registerFailedHandler(error) {
            this.isFirebaseError = true;

            switch (error.code) {
                case 'auth/email-already-in-use':
                    this.error = this.$utils.localeCopy.login.errors.emailAlreadyInUse;
                    break;
                case 'auth/invalid-email':
                    this.error = this.$utils.localeCopy.login.errors.invalidEmail;
                    break;
                case 'auth/weak-password':
                    this.error = this.$utils.localeCopy.login.errors.weakPassword;
                    break;
                default:
                    this.error = this.$utils.localeCopy.login.errors.default;
                    break;
            }
        },

        registerSuccededHandler() {
            this.$router.push(this.localePath('/hub'));
        },
    },
};
