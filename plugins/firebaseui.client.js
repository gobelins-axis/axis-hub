import { auth } from 'firebaseui/dist/npm__fr';

export default (context, inject) => {
    inject('firebaseui', { auth });
};
