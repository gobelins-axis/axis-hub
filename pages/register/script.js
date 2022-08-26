// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Components
import SectionRegister from '@/sections/login/SectionRegister';
import Footer from '@/components/Footer';

export default {
    mixins: [seo, pageTransitions],

    middleware({ store, redirect }) {
        const { isLoggedIn } = store.state.user;
        if (isLoggedIn) redirect('/hub');
    },

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
        SectionRegister,
        Footer,
    },
};
