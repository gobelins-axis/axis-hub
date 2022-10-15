// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import Footer from '@/components/Footer';

export default {
    mixins: [seo, pageTransitions],

    mounted() {

    },

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
    },

    components: {
        Footer,
    },
};
