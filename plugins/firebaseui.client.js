import { auth } from 'firebaseui';

export default (context, inject) => {
    inject('firebaseui', { auth });
};
