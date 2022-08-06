export default function(ctx) {
    const { store, redirect, route, getRouteBaseName } = ctx;
    const routeName = getRouteBaseName(route);
    console.log({ routeName });
    //
    // if (!store.state.user.isLoggedIn) {
    //     return redirect('/login')
    // }
}
