export const data = {
    label: 'Français',

    // Routes
    routes: {
        home: { name: 'Accueil', path: '/' },
        login: { name: 'Connexion', path: '/login' },
        register: { name: 'Inscription', path: '/inscription' },
        logout: { name: 'Déconnexion', path: '/logout' },
        games: { name: 'Jeux', path: '/games' },
        hub: { name: 'Espace créateur', path: '/hub' },
        documentation: { name: 'Documentation', path: '/documentation' },
    },

    // Error
    error: {
        message: 'Page introuvable',
    },

    // Not Supported
    notSupported: {
        message: 'Désolé, ce site n\'est pas supporté par votre navigateur',
    },

    // Pages
    login: {
        titleLogin: 'Connexion',
        titleRegister: 'Inscription',
        titleResetPassword: 'Réinitialisation du mot de passe',
        toggleLogin: 'Connexion',
        toggleRegister: 'Créer un compte',
        emailInputPlaceholder: 'Email',
        passwordInputPlaceholder: 'Mot de passe',
        passwordConfirmationInputPlaceholder: 'Confirmer votre mot de passe',
        submitLabel: 'Valider',
        forgotPasswordLabel: 'Mot de passe oublié',
        resetPasswordSuccessMessage: 'Si l\'adresse email renseignée a été trouvée dans notre base de donnée, vous devriez avoir reçu un email. Pensez à vérifier vos spams.',
        resetPasswordSuccessButtonLabel: 'Retourner à la page de connexion',
        googleLoginLabel: 'Continuer avec google',
        errors: {
            default: 'Nous avons rencontré une erreur inconnue. Contactez l\'éditeur du site.',
            userNotFound: 'Aucun compte ne correspond à cette adresse mail.',
            invalidEmail: 'L\'adresse email est invalide.',
            wrongPassword: 'Le mot de passe ne correspond pas à cette adresse mail.',
            form: 'Certains champs ne sont pas renseignés ou invalides.',
            emailAlreadyInUse: 'Un compte existe déja à cette adresse email.',
            weakPassword: 'Votre mot de passe doit contenir au moins 6 caractères.',
            passwordsNotMatching: 'Les mots de passe ne correspondent pas.',
        },
    },
};
