/**
 * Api plugin
 *
 * @plugin
 *
 * @example
 * $api.getEntryById('XXX')
 */
import contentfulModule from './contentful';
import contentfulEntries from './contentfulEntries';

const apiFactory = (error, store, req, route, redirect, i18n) => ({
    ...contentfulEntries,
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
