// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import FormGame from '@/components/FormGame';
import Footer from '@/components/Footer';

export default {
    mixins: [seo, pageTransitions],

    middleware: ['authenticated'],

    data() {
        return {};
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
        FormGame,
        Footer,
    },
};
