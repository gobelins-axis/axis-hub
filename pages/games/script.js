// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    name: 'page-games',

    mixins: [seo, pageTransitions],

    methods: {
        /**
         * Public
         */
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },

        /**
         * Private
         */
    },
};
