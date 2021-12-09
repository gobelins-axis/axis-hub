// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

export default {
    mixins: [seo, pageTransitions],

    // asyncData({ $api }) {
    //     const requests = [
    //         // Page Home
    //         $api.getEntryById($api.pages.home),
    //     ];

    //     return Promise.all(requests).then(([page]) => {
    //         return {
    //             data: page.fields,
    //         };
    //     });
    // },

    methods: {
        transitionIn(done, routeInfos) {
            console.log('transition in', routeInfos);
            done();
        },

        transitionOut(done, routeInfos) {
            console.log('transition out', routeInfos);
            done();
        },
    },
};
