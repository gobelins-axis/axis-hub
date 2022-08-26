export default {
    data() {
        return {
            email: '',
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
                if (!this.$refs.inputEmail.validity.valid) reject(Error(this.$utils.localeCopy.login.errors.form));
                resolve();
            });

            return promise;
        },

        sendResetpasswordEmail() {
            this.$firebase.resetPassword(this.$firebase.auth, this.email)
                .then(this.passwordResetSuccededHandler)
                .catch(this.passwordResetFailedHandler);
        },

        /**
         * Handlers
         */
        emailInputHandler(e) {
            this.showErrors = false;

            this.email = e.currentTarget.value;
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
                    this.sendResetpasswordEmail();
                })
                .catch((error) => {
                    this.isSuccess = false;
                    this.isFormError = true;
                    this.isInProgress = false;
                    this.isFirebaseError = false;
                    this.error = error.message;
                });
        },

        passwordResetFailedHandler(error) {
            this.isFirebaseError = true;

            switch (error.code) {
                case 'auth/user-not-found':
                    this.error = this.$utils.localeCopy.login.errors.userNotFound;
                    break;
                case 'auth/invalid-email':
                    this.error = this.$utils.localeCopy.login.errors.invalidEmail;
                    break;
                default:
                    this.error = this.$utils.localeCopy.login.errors.default;
                    break;
            }
        },

        passwordResetSuccededHandler() {
            this.isSuccess = true;
        },
    },
};
