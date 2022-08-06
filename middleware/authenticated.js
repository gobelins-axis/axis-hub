export default function({ store, redirect }) {
    const { isLoggedIn } = store.state.user;

    if (!isLoggedIn) {
        return redirect('/login');
    }
}
