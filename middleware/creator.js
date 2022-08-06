export default function({ store, params, redirect }) {
    const gameID = params.id;
    const { isLoggedIn } = store.state.user;
    const userUID = isLoggedIn ? store.state.user.user.uid : null;
    const game = store.state.games.games.filter((item) => { return item.id === gameID; })[0];

    if (!game || game.fields.creatorID !== userUID) {
        return redirect('/error');
    }
}
