// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import FormResetPassword from '@/components/FormResetPassword';
import Footer from '@/components/Footer';

export default {
    mixins: [seo, pageTransitions],

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
        FormResetPassword,
        Footer,
    },
};
