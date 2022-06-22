import {initializeApp, getApps} from 'firebase/app';
import {getFirestore, getDoc, collection, getDocs, doc, setDoc} from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import {getStorage, ref} from 'firebase/storage';

// TODO: migration to axis firebase account
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'gobelins-axis.firebaseapp.com',
    projectId: 'gobelins-axis',
    storageBucket: 'gobelins-axis.appspot.com',
    messagingSenderId: '529378279324',
    appId: '1:529378279324:web:3f38515eec42d202dc9259',
    measurementId: 'G-YSGEBD6L4W',
};

export default ({store}, inject) => {
    const apps = getApps();
    const firebaseApp = !apps.length ? initializeApp(config) : apps[0];

    const auth = getAuth(firebaseApp);
    const createUser = createUserWithEmailAndPassword;
    const signInUser = signInWithEmailAndPassword;
    const resetPassword = sendPasswordResetEmail;
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage);

    function getAllGames() {
        const collectionRef = collection(firestore, 'games');

        const promise = new Promise((resolve, reject) => {
            getDocs(collectionRef).then((response) => {
                const games = response.docs.map((doc) => {
                    return {id: doc.id, fields: doc.data()};
                });
                store.dispatch('games/setGames', games)
                resolve(games);
            });
        });

        return promise;
    }

    function getUserGames(user) {
        let userGames = store.state.games.games.filter(game => game.fields.creatorID === user.uid)
        store.dispatch('user/setGames', userGames).then(() => {
        })
    }

    function fetchGames(user) {
        getAllGames().then(() => getUserGames(user))
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

    auth.onAuthStateChanged((user) => {
        store.dispatch('user/setLoggedInUser', user).then(() => {
            if (user !== null) {
                getUserGames(user)
            }
        })
    })

    inject('firebase', {
        auth,
        createUser,
        signInUser,
        resetPassword,
        firestore,
        storage,
        storageRef, // Custom methods
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
            getUserGames(store.state.user.user)
        }
    });


};
