export default ({ i18n, $t }, inject) => {
    inject('utils', {
        lang: i18n.locale,
        localeCopy: i18n.t('data'),
    });
};
