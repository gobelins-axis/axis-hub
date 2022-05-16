import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

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

export default ({ store }, inject) => {
    const apps = getApps();
    const firebaseApp = !apps.length ? initializeApp(config) : apps[0];

    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage);

    inject('firebase', { auth, firestore, storage, storageRef });

    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            store.dispatch('user/setLoggedInUser', user);
            resolve(user);
        });
    });
};
