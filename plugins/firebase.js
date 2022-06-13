import {initializeApp, getApps} from 'firebase/app';
import {getFirestore, getDoc, collection, getDocs, doc, setDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
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
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage);

    function getGames() {
        const collectionRef = collection(firestore, 'games');

        const promise = new Promise((resolve, reject) => {
            getDocs(collectionRef).then((response) => {
                const games = response.docs.map((doc) => {
                    return {id: doc.id, fields: doc.data()};
                });
                resolve(games);
            });
        });

        return promise;
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
            let userGames = store.state.games.games.filter(game => game.fields.creatorID === user.uid)
            store.dispatch('user/setGames', userGames)
        });
    })

    inject('firebase', {
        auth,
        firestore,
        storage,
        storageRef, // Custom methods
        getGames,
        getGameLeaderboard,
    });

    const promises = [
        getGames(),
    ];

    return Promise.all(promises).then(([games]) => {
        store.dispatch('games/setGames', games);
    });


};
