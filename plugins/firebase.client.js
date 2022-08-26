import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, getDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, sendPasswordResetEmail, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'gobelins-axis.firebaseapp.com',
    projectId: 'gobelins-axis',
    storageBucket: 'gobelins-axis.appspot.com',
    messagingSenderId: '529378279324',
    appId: '1:529378279324:web:3f38515eec42d202dc9259',
    measurementId: 'G-YSGEBD6L4W',
};

export default ({ store, i18n }, inject) => {
    const apps = getApps();
    const firebaseApp = !apps.length ? initializeApp(config) : apps[0];

    const auth = getAuth(firebaseApp);
    const createUser = createUserWithEmailAndPassword;
    const signInUser = signInWithEmailAndPassword;
    const signInWithGoogle = signInWithRedirect;
    const resetPassword = sendPasswordResetEmail;
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage);
    const googleAuthProvider = new GoogleAuthProvider();

    function getAllGames() {
        const collectionRef = collection(firestore, 'games');

        const promise = new Promise((resolve, reject) => {
            getDocs(collectionRef).then((response) => {
                const games = response.docs.map((doc) => {
                    return { id: doc.id, fields: doc.data() };
                });
                store.dispatch('games/setGames', games);
                resolve(games);
            });
        });

        return promise;
    }

    function getUserGames(user) {
        const userGames = store.state.games.games.filter(game => game.fields.creatorID === user.uid);
        store.dispatch('user/setGames', userGames);
    }

    function fetchGames(user) {
        getAllGames().then(() => getUserGames(user));
    }

    function getGameLeaderboard(id) {
        const leaderboardCollection = collection(firestore, 'leaderboards');
        const gameRef = doc(leaderboardCollection, id);
        const scoreCollectionRef = collection(gameRef, 'scores');

        const promise = new Promise((resolve) => {
            getDocs(scoreCollectionRef).then((response) => {
                const scores = response.docs.map((doc) => {
                    return doc.data();
                });
                resolve(scores);
            });
        });

        return promise;
    }

    // Set Auth language
    auth.languageCode = i18n.locale;

    // Get user from Google Login redirection
    getRedirectResult(auth);

    // Watch Authentification change to update store
    auth.onAuthStateChanged((user) => {
        store.dispatch('user/setLoggedInUser', user).then(() => {
            if (user !== null) {
                getUserGames(user);
            }
        });
    });

    inject('firebase', {
        auth,
        createUser,
        signInUser,
        resetPassword,
        signInWithGoogle,
        googleAuthProvider,
        firestore,
        storage,
        storageRef,
        // Custom methods
        getAllGames,
        getUserGames,
        fetchGames,
        getGameLeaderboard,
    });

    const promises = [
        getAllGames(),
    ];

    return Promise.all(promises).then(([games]) => {
        if (store.state.user.user) {
            getUserGames(store.state.user.user);
        }
    });
};
