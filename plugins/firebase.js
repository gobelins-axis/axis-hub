import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'arcade-hub.firebaseapp.com',
    projectId: 'arcade-hub',
    storageBucket: 'arcade-hub.appspot.com',
    messagingSenderId: '881025608612',
    appId: '1:881025608612:web:cdf2dd5adcf3692a312f31',
    measurementId: 'G-WL5JQ8JRKT',
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
