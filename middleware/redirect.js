export default function (ctx) {
    const { store, redirect, route, i18n, getRouteBaseName } = ctx;
    console.log(ctx)
    // If the user is not authenticated
    console.log(route)
    console.log(i18n)
    console.log(getRouteBaseName(route))

    //
    // if (!store.state.user.isLoggedIn) {
    //     return redirect('/login')
    //
    // }


}
