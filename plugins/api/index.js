/**
 * Api plugin
 *
 * @plugin
 *
 * @example
 * $api.getEntryById('XXX')
 */
import contentfulModule from './contentful';

const apiFactory = (error, store, req, route, redirect, i18n) => ({
    pages: {
        home: '3b2e29tNguY3cO0UwTWCrF',
        services: 'O3TBilGkhpXfBdIuWvNLt',
        about: '2fTujXVPKdF78T0QNvjtrD',
        contact: '16CcrNGd7AqJC2UUPMCBWw',
    },
    ...contentfulModule({ error, store, i18n }),
});

export default (context, inject) => {
    const { app, error, store, route, req, redirect } = context;
    const i18n = app.i18n;
    const api = apiFactory(error, store, req, route, redirect, i18n);

    inject('api', api);
    inject('i18n', i18n);

    // Fetch data and dispatch to store
    const promises = [
        // test
        // api.getEntryById('5q2iMXcNV7R6lC7qm9hgdx'),
    ];

    return Promise.all(promises).then(([test]) => {
        // console.log(test.fields);
        // store.dispatch('data/setData', home);
    });
};
