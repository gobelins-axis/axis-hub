import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

    inject('firebase', { auth });

    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            store.dispatch('firebase-auth/setLoggedInUser', user);
            resolve(user);
        });
    });
};
