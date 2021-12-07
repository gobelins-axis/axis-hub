const contentfulDelivery = require('contentful');

const configDelivery = {
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN_DELIVERY,
};

export default function({ i18n, error }) {
    const clientDelivery = contentfulDelivery.createClient(configDelivery);

    /**
     * Basics
     */

    /**
     * Returns the list of entries
     * @returns {Array.<Object>} List of all entries
     */
    async function getEntries(options = {}) {
        const locale = options.lang || i18n.localeProperties.name;
        let res;
        try {
            res = await clientDelivery.getEntries({
                locale,
                include: 10,
            });
        } catch (errorMessage) {
            return error(errorMessage);
        }
        return res;
    }

    /**
     * Returns the list of entries by types
     * @param {String} type entry type
     * @returns {Array.<Object>} List of entries
     */
    async function getEntriesByType(type, options = {}) {
        const locale = options.lang || i18n.localeProperties.name;
        let res;
        try {
            res = await clientDelivery.getEntries({
                locale,
                content_type: type,
                include: 10,
                ...options,
            });
        } catch (errorMessage) {
            return error(errorMessage);
        }
        return res;
    }

    /**
     * Returns the entry needed by its id
     * @param {String} id entry id
     * @returns {Object} return the entry
     */
    async function getEntryById(id, options = {}) {
        const locale = options.lang || i18n.localeProperties.name;
        let res;
        try {
            res = await clientDelivery.getEntry(id, {
                locale,
                include: 10,
            });
        } catch (errorMessage) {
            return error(errorMessage);
        }
        return res;
    }

    return {
        // Basis
        getEntries,
        getEntriesByType,
        getEntryById,
    };
}
